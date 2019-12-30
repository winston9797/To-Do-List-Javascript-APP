//list object
var list = [];
var title,importance,id;
console.log(list);
//for debugin
function logData(){
    return list;
}

//select elements
document.getElementById('add-btn').addEventListener('click',addItemToList);
document.addEventListener('keypress',function(event){
    if(event.keyCode === 13 || event.keyCode.which === 13){
        addItemToList();
    }
});
document.querySelector('.list-group').addEventListener('click',removeItem);
document.getElementById('clear').addEventListener('click',clearItems);

// get data from local storage
if(localStorage.getItem('list')){
    list = JSON.parse(localStorage.getItem('list'));
}
//painting in the UI using paint ui function
for(li in list){
    paintItemToUI(list[li]);
}



//clear Items
function clearItems(){
    console.log('clear');
    //Clear the UI List
    document.querySelector('.list-group').innerHTML = '';

    //clear the list object
    list = [];

    localStorage.setItem('list',JSON.stringify(list));

}

//removeItem
function removeItem(e){
    if(e.target.className == 'fa fa-times-circle'){
        console.log(e.target);
        //remove from the UI
        e.target.parentNode.parentNode.remove();
        //remove from list object
        //converting the id string number into programmable number
        idInt = parseFloat(e.target.parentNode.parentNode.id);
        for(lis in list){
            if(lis == idInt -1){
                list.splice(lis,1);
            }
        }
        localStorage.setItem('list',JSON.stringify(list));
    }
    e.preventDefault();
}

//aadd item to list object
function addItemToList(){
    //select inputs
    title = document.getElementById('title').value;
    importance = document.getElementById('importance').value;
    id = 0;
    if(document.getElementById('title').value == 'ism'){
        alert('sma3in sit7awa');
    }
    if(document.getElementById('title').value != '' ){
        if(list !== null){
            id = list.length + 1;
        }
        //add to list
        var item = {title,importance,id};
        if(list !== null){
            list.push(item);
        }
    

        //clearing input
        document.getElementById('title').value = '';

        //paint the list to the UI
        paintItemToUI(item);

        localStorage.setItem('list',JSON.stringify(list));
    }else{
        document.getElementById('alert').innerHTML = '<div class="alert alert-danger" role="alert">PLEASE FILL IN THE TITLE INPUT TO ADD A TO DO </div>';
        setTimeout(function(){
            document.getElementById('alert').innerHTML = ''; 
        },2000);
    }
}

//add list item to ui
function paintItemToUI(item){
    //Creat an li elemtn
    var li = document.createElement('li');
    //adding a class to it
    li.className = 'list-group-item';
    li.id = `${item.id}`;
    //checking for importance type
    var importanceType;
    if(item.importance == 'high'){
        importanceType = 'danger';
    }else if(item.importance == 'medium'){
        importanceType = 'warning';
    }else if(item.importance == 'low'){
        importanceType = 'primary';
    }
    //sitting the html
    li.innerHTML = ` ${item.title} <button class="btn btn-${importanceType}">
    ${item.importance}</button> <a href='#' class="remove float-right" id="remove-item" ><i style='font-size:20px color:red;' class='fa fa-times-circle'></i></a>`;
    document.querySelector('.list-group').appendChild(li);
}