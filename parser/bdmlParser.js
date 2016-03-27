function toBDO(bdml) {
    var objective = getObjective(bdml);
    var problem   = getProblem(bdml);

    var code = getCode(bdml);
    var parsedCode = parseCode(code);

    var BDO = {
        objective : objective,
        problem   : problem,
        keyMap    : parsedCode.keyMap,
        html      : parsedCode.html
    };

    alert(BDO.keyMap[0].key);
    return BDO;
}

function getObjective(bdml) {
    return bdml.getElementsByTagName("objective")[0].childNodes[0].nodeValue;
}

function getProblem(bdml) {
    return bdml.getElementsByTagName("problem")[0].childNodes[0].nodeValue;
}

function getCode(bdml) {
    return bdml.getElementsByTagName("code")[0];
}

function parseCode(code) {
    var keyMap = [];
    var keyCount = 0;

    var html = "";

    $.each(code.childNodes, function(index, value) {
        switch(value.nodeName) {
            case "#text":
                html += value.nodeValue;
                break;
            case "op":
            case "exp":
            case "cond":
                var parsedElement = parseElement(value, keyCount++);
                html += parsedElement.html;
                keyMap.push( { id : parsedElement.id, key : parsedElement.key });
                break;
            default:
                alert("Error: default switch case met.");
                break;
        }
    });

    return {
        keyMap : keyMap,
        html   : html
    };
}

function parseElement(element, keyCount) {
    var key = element.getAttribute("key");

    var idName = element.nodeName + keyCount;
    var className  = element.nodeName + "Field";

    var width = 10;

    var html;
    html = "";
    html += "<textarea ";
    html += "id=\"" + idName + "\" ";
    html += "class=\"" + className + "\" ";
    html += "rows=\"1\" ";
    html += "cols=\"" + width + "\" ";
    html += "placeholder=\"" + element.nodeName + "\" ";
    html += "></textarea>";

    return {
        html : html,
        id : idName,
        key : key
    }
}