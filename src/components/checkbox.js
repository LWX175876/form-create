import Handler from "../factory/handler";
import Render from "../factory/render";
import {extend} from "../core/util";

const name = "checkbox";

class handler extends Handler {
    toParseValue(value) {
        if (!value)
            value = [];
        else if (!Array.isArray(value))
            value = [value];
        return this.rule.options.filter((opt) => value.indexOf(opt.value) !== -1)
            .map((option) => option.label);
    }

    toTrueValue(parseValue) {
        let value = this.rule.options.filter((opt) => parseValue.indexOf(opt.label) !== -1)
            .map((opt) => opt.value);
        if (this.rule.options.length === 1)
            return value[0] === undefined ? '' : value[0];
        else
            return value;
    }

    watchParseValue(n) {
        super.watchParseValue(n);
        this.render.sync();
    }
}

class render extends Render {
    parse() {
        let {unique, rule: {options}, key} = this.handler;
        return [this.vNode.checkboxGroup(this.inputProps().key(key).get(), () => options.map((option, index) => {
            let clone = extend({}, option);
            delete clone.value;
            return this.vNode.checkbox({
                props: clone,
                key: `copt${index}${unique}`
            })
        }))];
    }
}

export default {handler, render, name};
