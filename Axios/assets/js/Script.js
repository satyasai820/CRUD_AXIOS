
let totalData = [];

//add the student function using Axios with POST

function add() {
    var nameEl = $("#name").val();
    var ageEl = $("#age").val();
    var branchEl = $("#branch").val();

    const postData = {
        name: nameEl,
        age: ageEl,
        branch: branchEl
    }
    console.log("object is data is ready", postData);
    if (nameEl === "" && ageEl === "" && branchEl === "") {
        alert("please fill all fields")
    } else {
        axios.post("http://localhost:3000/student", postData)
            .then(response => {
                totalData = response.data
                console.log("response data", response.data);
                // alert("hold the data at posting...."); 
                getData();

            })
            .catch(error => {
                alert("Somthing went Wrong with url");
            });
    }

}
getData();

function getData() {
    axios.get("http://localhost:3000/student")
        .then(response => {
            totalData = response.data;
            console.log("this is json data", totalData);
            let collectData = " ";
            totalData.map(element => {
                collectData += `
            <tr>
            <th>${element.id}</th>
            <td>${element.name}</td>
            <td>${element.age}</td>
            <td>${element.branch}</td>
            <td><button type="button" class="btn btn-primary" onclick="updateData(${element.id})">Update</button></td>
            <td><button type="button" class="btn btn-danger" onclick="removeData(${element.id})">Remove</button></td>
            </tr>`
            });
            document.getElementById("tableData").innerHTML = collectData;
        })
        .catch(error => {
            alert(error);
        })
}


//update the student using axios.put

function updateData(id){
    let y = totalData.find(item => item.id === id);
    console.log("this is updated id details", y)
    $("#name").val(y.name);
    $("#age").val(y.age);
    $("#branch").val(y.branch);
    $("#ahead").css('display','none');
    $("#ehead").css('display','block');
    $("#adbtn").css('display','none');
    $("#edbtn").css('display','block');
    
    $("#edbtn").click(function(){
        let nameEl = $("#name").val();
        let ageEl = $("#age").val();
        let branchEl = $("#branch").val();
        const putData = {
            name:nameEl,
            age:ageEl,
            branch:branchEl
        }
        console.log("this is put data", putData);
        const url = "http://localhost:3000/student";
        if(nameEl === "" && ageEl === "" && branchEl === "" ){
            alert("please fill the all forms")
        }
        axios.put(`${url}/${id}`,putData,)
        .then(response => {
            // alert("holding data at updation")
            console.log("data updated",response.data);
        })
        .catch( error => {
            alert(error,"somthig went wrong in url")
        })
        
    })
    
}

//Delete the record using axios

function removeData(id){
    const url = "http://localhost:3000/student";
    axios.delete(`${url}/${id}`)
    .then(response => {
        console.log("Record deleted successdully..!")
        // alert("holding the data in deletion")
        
    })
    .catch( error => {
        alert(error,"somthing went wrong in url");
    })
}




