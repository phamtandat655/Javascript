
function Validator (formselector ) {
    var _this = this ;
    var formRules = {};

    function getParent (element , selector) {

        while (element.parentElement) {
            if(element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    // tạo object để lưu tất cả rules
    // nếu có lỗi return error message
    // nếu ko có lỗi return undefined
    var validatorRules = {
        required : function(value) {
            return value ? undefined : 'Vui lòng nhập trường này';
        },
        email : function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Vui lòng nhập email';
        },
        min : function(min) {
            return function(value) {
                return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự`;
            }
        },
        max : function(max) {
            return function(value) {
                return value.length <= max ? undefined : `Vui lòng nhập tối đa ${max} ký tự`;
            }
        }
    }

    // lấy ra form element trong DOM theo form selector
    var formElement = document.querySelector(formselector);

    // Lấy đc thì mới thực hiện
    if(formElement) {
        var inputs = formElement.querySelectorAll('[name][rules]')
        for(var input of inputs) {

            var rules = input.getAttribute('rules').split('|');
            for(var rule of rules) {
                // cắt rule
                var ruleInfo;
                var isRuleHasValue = rule.includes(':');

                if(isRuleHasValue) {
                    ruleInfo = rule.split(':');

                    // gán chữ min trước dấu :
                    rule = ruleInfo[0];
                }

                var ruleFunc = validatorRules[rule];
                if(isRuleHasValue) {
                    // gán số 6 sau dấu :
                    ruleFunc = ruleFunc(ruleInfo[1]);
                }

                if(Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc);
                } else {
                    formRules[input.name] = [ruleFunc];
                }
            }

            // Lắng nghe sự kiện để validate (blur ,change ,...)

            input.onblur = handleValidate;
            input.oninput = handleClearError;
        }
        // Hàm thực hiện validate
        function handleValidate (event) {
            var rules = formRules[event.target.name];
            var errorMessage ;

            for(var rule of rules) {
                errorMessage =  rule(event.target.value);
                if(errorMessage) {
                    break;
                }
            }

            // Nếu có lỗi thì hiển thị message lỗi ra UI
            if(errorMessage){
                var formGroup = getParent(event.target,'.form-group');
                if(formGroup) {
                    formGroup.classList.add('invalid');

                    var formMessage = formGroup.querySelector('.form-message');
                    if(formMessage) {
                        formMessage.innerText = errorMessage;
                    }
                }
            }

            return !errorMessage;
        }
        // Hàm clear message lỗi
        function handleClearError (event) {
            var formGroup = getParent(event.target,'.form-group');
            if(formGroup.classList.contains('invalid')) {
                formGroup.classList.remove('invalid')
                var formMessage = formGroup.querySelector('.form-message');
                
                if(formMessage) {
                    formMessage.innerText = '';
                }
            }
        }
    }
    // Xử lí hành vi submit form
    formElement.onsubmit = function (event) {
        event.preventDefault();

        var inputs = formElement.querySelectorAll('[name][rules]')
        var isValid = true;

        for(var input of inputs ) {       
            if(!handleValidate({target:input})) {
                isValid = false;
            }
        }
        // Khi không có lỗi thì submit form
        if(isValid) {
            if (typeof _this.onSubmit === 'function') {
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
                
                // hàm tạo bên html
                // gọi lại hàm onSubmit và trả về giá trị của form
                _this.onSubmit(formValues);
            } else {
                // hàm submit mặc định của js
                formElement.submit();
            }
        }
    }
}