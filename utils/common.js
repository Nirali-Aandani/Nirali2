module.exports = {
    convertObjectToEnum: (obj) => {
        const enumArr = [];
        Object.values(obj).map((val) => enumArr.push(val));
        return enumArr;
    },
    randomNumber: (length = 4) => {
        let numbers = '12345678901234567890';
        let result = '';
        for (let i = length; i > 0; --i) {
            result += numbers[Math.round(Math.random() * (numbers.length - 1))];
        }
        return result;
    }
};
