function serializeToJson(form) {
    let result = {};
    var f = form.serializeArray();
    f.forEach((item) => {
        result[item.name] = item.value
    })
    return result;
}