"use strict"
var fs = require('fs')
var yaml = require('write-yaml');
var jsonfile = require('jsonfile')
var csv = require('fast-csv')
var dataPerson = [];
var temp = "";

class PersonData {
    constructor(params) {
        this.id = params['id']
        this.first_name = params['first_name']
        this.last_name = params['last_name']
        this.email = params['email']
        this.phone = params['phone']
        this.created_at = params['created_at']
    }
}

class PersonParser {
    constructor(file) {
        this._file = file
        this._people = [];
    }

    get people() {
        if (this._file == (this._people.length == 0)) {
            return this._people
        } else {
            fs.createReadStream(this._file).pipe(csv())
                .on('data', function(data) {
                    var tampilData = {
                        id: data[0],
                        first_name: data[1],
                        last_name: data[2],
                        email: data[3],
                        phone: data[4],
                        created_at: data[5]
                    }
                    dataPerson.push(new PersonData(tampilData))
                }).on('end', function(data) {
                    var tambahData = {
                        id: "203",
                        first_name: "Dila",
                        last_name: "Arista",
                        email: "diladilo@gmail.com",
                        phone: "021-000033333",
                        created_at: new Date()
                    }
                    parser.addPerson(new PersonData(tambahData))
                    for (var i = 0; i < dataPerson.length; i++) {
                        if (i == 0) {
                            temp += dataPerson[i].id + "," + dataPerson[i].first_name + "," + dataPerson[i].last_name + "," + dataPerson[i].email + "," + dataPerson[i].phone + "," + dataPerson[i].created_at + "\n";
                        } else {
                            temp += dataPerson[i].id + "," + dataPerson[i].first_name + "," + dataPerson[i].last_name + "," + dataPerson[i].email + "," + dataPerson[i].phone + "," + new Date(dataPerson[i].created_at) + "\n";
                        }
                    }
                    console.log(temp);
                    parser.save(temp);
                    dataPerson.splice(0, 1)
                    parser.save_as_json(dataPerson);
                    parser.save_as_yaml(dataPerson);
                })

        }
    }
    addPerson(add) {
        dataPerson.push(add)
    }

    save(temp) {
        fs.writeFile('people.csv', temp)
    }

    save_as_yaml(dataPerson) { //https://github.com/jonschlinkert/write-yaml
        yaml.sync('people.yml', dataPerson);
    }

    save_as_json(dataPerson) {
        jsonfile.writeFile('people.json', dataPerson) // https://www.npmjs.com/package/jsonfile
    }
}

var parser = new PersonParser('people.csv')
parser.people
