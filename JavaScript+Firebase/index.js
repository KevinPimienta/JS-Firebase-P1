var firebaseConfig = {
    apiKey: "AIzaSyChP6NRGviCQ7FY49MVNK1khnoHCDHPb90",
    authDomain: "bandas-fa71b.firebaseapp.com",
    databaseURL: "https://bandas-fa71b.firebaseio.com",
    projectId: "bandas-fa71b",
    storageBucket: "bandas-fa71b.appspot.com",
    messagingSenderId: "712520475923",
    appId: "1:712520475923:web:2d18c9383aede732f526e6",
    measurementId: "G-1D2LX8SFVR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var anio = document.getElementById("Input3").value;
    var genero = document.getElementById("Input4").value;

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var banda = {
            id, //matricula:id
            nombre,
            anio,
            genero,
        }

        //console.log(alumno);

        firebase.database().ref('Banda/' + id).update(banda).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Alumnos').push().key;
    //data[`Alumnos/${key}`]= alumno;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Banda');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(banda){
    
    if(banda!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = banda.id;
        cell2.innerHTML = banda.nombre; 
        cell3.innerHTML = banda.anio;
        cell4.innerHTML = banda.genero; 
        cell5.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${banda.id})">Eliminar</button>`;
        cell6.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+banda.id+')">Modificar</button>';
    }
}

function deleteR(id){
    firebase.database().ref('Banda/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id){
    var ref = firebase.database().ref('Banda/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(banda){
    if(banda!=null)
    {
        document.getElementById("Input1").value=banda.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=banda.nombre;
        document.getElementById("Input3").value=banda.anio;
        document.getElementById("Input4").value=banda.genero;
    }
}


//Para consulta de carrera
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;

    var ref = firebase.database().ref("Banda");
    ref.orderByChild("genero").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(banda){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = banda.id;
    cell2.innerHTML = banda.nombre; 
    cell3.innerHTML = banda.anio;
    cell4.innerHTML = banda.genero; 
   
}