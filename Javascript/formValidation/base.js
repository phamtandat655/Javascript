// Đối tượng validator (construction)
function Validator (options) {
    // Tìm thẻ cha của thẻ input , nếu nó nằm sâu cỡ nào cũng tìm được
    function getParent (element , selector) {
        while(element.parentElement) {
            if(element.parentElement.matches(selector)) {
                return element.parentElement;
            }  
            element = element.parentElement; 
        }
    }

    var selectorRules = {}; 

    // hàm thực hiện validate
    function validate(inputElement , rule) {
        
        var errorElement = getParent(inputElement , options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage ;

        // lấy ra và kiểm tra từng rule
        var rules = selectorRules[rule.selector];
        for(var i=0; i<rules.length ; ++i) {
            // check lỗi của checkbox radio
            switch(inputElement.type) {
                case 'radio' :
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    // mỗi cái rules[i] là 1 hàm test
                    errorMessage = rules[i](inputElement.value); 
            }
            // nếu có lỗi thì dừng việc kiểm tra
            if (errorMessage) {
                break;
            }
        }

        if(errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement , options.formGroupSelector).classList.add('invalid');
        } else {
            errorElement.innerText = '';
            getParent(inputElement , options.formGroupSelector).classList.remove('invalid');
        }
        // true là ko có lỗi , false là có lỗi
        return !errorMessage;
    }
    // lấy ele của form cần validate
    var formElement = document.querySelector(options.form);

    if(formElement) {
        // làm hàm nếu có onSubmit ở Validator thì trả ra 1 object còn nếu ko có onSubmit thì giữ lại hành vi mặc định của trình duyệt
        formElement.onsubmit = function (e) {
            // Bỏ hành vi khi bấm submit form sẽ load qua trang khác
            e.preventDefault();

            var isFormValid = true;

            // Lặp qua từng rule và validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                // nếu mà chưa điền gì mà bấm submit sẽ hiễn lỗi ở tất cả ô input thông qua hàm validate
                var isValid = validate(inputElement , rule);
                if(!isValid) {
                    isFormValid = false;
                }
            })
            
            if(isFormValid) {
                // Trường hợp submit với Javascript
                if(typeof options.onSubmit === 'function') {
        
                    // lấy ra tất cả ô input có name
                    var enableInputs = formElement.querySelectorAll('[name]');
                    // chuyển ô cái NodeList đã lấy ở trên thành Array để có thể dùng hàm reduce
                    // values là biến lưu trữ , còn input là giá trị hiện tại khi duyệt qua
                    var formValues = Array.from(enableInputs).reduce(function (values , input) {
                        
                        switch(input.type) {
                            case 'radio':
                                if(input.matches(':checked')) {
                                    values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                }
                                break;
                            case 'checkbox':
                                if(!input.matches(':checked')) {
                                    values[input.name] = '';
                                    return values;
                                }

                                if(!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }

                                values[input.name].push(input.value);
                                break;
                            default:
                                values[input.name]= input.value;
                        }
                        
                        return values;
                    }, {});
                    
                    // Sau này sẽ Call API
                    options.onSubmit(formValues);
                }
                // Trường hợp submit với hành vi mặc định của trình duyệt
                else {
                    formElement.submit();
                }
            }
        }
        
        // lặp qua mỗi rule và xử lí (lắng nghe blur , input , ....)
        options.rules.forEach (function (rule) {
            
            // Lưu lại các rule cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            // lấy ra selector
            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach(function(inputElement) {
                if (inputElement) {
                    // xử lí trường hợp blur khỏi input
                    inputElement.onblur = function () {
                        validate(inputElement , rule);
                    }
    
                    // Xử lí mỗi khi người dùng nhập vào input là sẽ bỏ cái báo lỗi
                    inputElement.oninput = function () {
                        var errorElement = getParent(inputElement , options.formGroupSelector).querySelector('.form-message');
                        errorElement.innerText = '';
                        getParent(inputElement , options.formGroupSelector).classList.remove('invalid');
                    }
                }
            });

        })
        // console.log(selectorRules);
    }
}

// Định nghĩa các rules
// Nguyên tắc của rule
// 1. khi có lỗi => trả ra message lỗi
// 2. khi hợp lệ => ko trả ra gì (undefined)
Validator.isRequired = function(selector, message) {
    return {
        selector:selector,
        test : function (value) {
            return value ? undefined : message || 'vui lòng nhập trường này';
        }
    };
}

Validator.isEmail = function(selector , message) {
    return {
        selector:selector,
        test : function (value) {
             var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
             return regex.test(value) ? undefined : message || 'Trường này phải là email';
            //  test chỗ regex là hàm của js để ktra email
        }
    };
}

Validator.minLength = function (selector , min , message) {
    return {
        selector : selector,
        test : function (value) {
             return value.length >= min ? undefined : message || `vui lòng nhập tối thiểu ${min} kí tự`;
        }
    };
}

Validator.isConfirmed = function (selector , getConfirmValue , message) {
    return {
        selector : selector,
        test : function (value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác'
        }
    }
}