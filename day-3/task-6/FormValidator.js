"use strict";
class FormValidator {
    form;
    rules;
    constructor(form, rules) {
        this.form = form;
        this.rules = rules;
    }
    validate(key) {
        const errors = {};
        let isValid = true;
        for (const key in this.rules) {
            const fieldRules = this.rules[key];
            if (!fieldRules)
                continue;
            const value = this.form.get(key) ?? '';
            for (const rule of fieldRules) {
                if (rule.required && !value) {
                    errors[key] = `${String(key)} is required`;
                    isValid = false;
                    break;
                }
                if (rule.minLength && value && value?.length < rule.minLength) {
                    errors[key] = `minimum ${rule.minLength} is required`;
                    isValid = false;
                    break;
                }
                if (rule.pattern && !rule.pattern.test(value)) {
                    errors[key] = `invalid format`;
                    isValid = false;
                    break;
                }
                if (rule.custom) {
                    let customErr = rule.custom(value);
                    if (customErr) {
                        errors[key] = customErr;
                        isValid = false;
                        break;
                    }
                }
            }
        }
        return {
            valid: isValid,
            errors
        };
    }
}
