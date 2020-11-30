const dateFormat = (dateObj) => {
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(dateObj);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(dateObj);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(dateObj);
    return `${ye}-${mo}-${da}`;
}

const getAge = (dateObj) => {
    const dateDiff = new Date(new Date() - dateObj);
    return dateDiff.getFullYear()-1970;
};

module.exports = {
    dateFormat,
    getAge
};
