    var re = /\d+/g; 
    var str = '/french-75/6729/';
    var m = []
     
    while ((m = re.exec(str)) !== null) {
        if (m.index === re.lastIndex) {
            re.lastIndex++;
        }
        // View your result using the m-variable.
        // eg m[0] etc.
        console.dir(m[m.length - 1])
    }


