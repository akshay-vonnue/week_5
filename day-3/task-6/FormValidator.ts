type Rule<T = unknown> = {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
    custom?: (v: T) => string | null;
}

class FormValidator<T extends Record<string, unknown>>{

    private form: Map<keyof T, string>
    private rules: { [K in keyof T]? : Rule<T[K]>[] }

    constructor(form:Map<keyof T,string>, rules: { [K in keyof T]?: Rule<T[K]>[] }) {
        this.form = form
        this.rules = rules
    }

    validate(key: keyof T): { valid: boolean, errors: Partial<Record<keyof T, string>> }{
        const errors:Partial<Record<keyof T, string>> = {}
        let isValid = true;

        for (const key in this.rules) {
            const fieldRules = this.rules[key]
            if (!fieldRules) continue;

            const value = this.form.get(key) ?? ''

            for (const rule of fieldRules) {
                if (rule.required && !value) {
                    errors[key] = `${String(key)} is required`
                    isValid = false
                    break;
                }

                if (rule.minLength && value && value?.length < rule.minLength) {
                    errors[key] = `minimum ${rule.minLength} is required`
                    isValid = false
                    break;
                }

                if (rule.pattern && !rule.pattern.test(value)) {
                    errors[key] = `invalid format`
                    isValid = false
                    break;
                }

                if (rule.custom) {
                    let customErr = rule.custom(value as T[Extract<keyof T, string>])
                    if (customErr) {
                        errors[key] = customErr
                        isValid = false
                        break;
                    }
                } 
            }

        }
        return {
            valid: isValid,
            errors
        }
    }
}