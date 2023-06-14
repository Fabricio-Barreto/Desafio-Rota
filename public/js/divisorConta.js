const inputPeople = document.getElementById("inputPeople");
const btnPeople = document.getElementById("btnPeople");
const sectionPeople = document.getElementById("sectionPeople");
const inputFood = document.getElementById("inputFood");
const btnFood = document.getElementById("btnFood");
const sectionFood = document.getElementById("sectionFood");
const btnGerar = document.getElementById("btnGerar");
const btnCheckbox = document.getElementById("btnCheckbox")
const inputFoodPreco = document.getElementById("inputFoodpreco");
const btnReset = document.getElementById("btnReset");
const container = document.getElementById("container");
const people = [];
const foods = [];

sectionPeople.innerHTML = "Pessoas adicionadas: ";
sectionFood.innerHTML = "Comidas adicionadas:  ";
btnCheckbox.disabled = true;

function addPeople() {
    if (inputPeople.value == "") {
        alert("preencha os dados corretamente.")
    } else {
        let personDiv = document.createElement("div")
        people.push({nome : inputPeople.value, taxaServico : document.getElementById("taxaServicoCheckbox").checked});
        personDiv.innerHTML = inputPeople.value;
        sectionPeople.appendChild(personDiv);
        console.log(people);
    }
}


function addFood() {
    if (inputFood.value == "" || inputFoodPreco.value == ""){
        alert("preencha os dados corretamente.")
    } else {
        let foodDiv = document.createElement("div")
        foods.push({nome: inputFood.value, preco: parseInt(inputFoodPreco.value), consumidoPor: []});
        console.log(inputFoodPreco.value)
        foodDiv.innerHTML = inputFood.value + " : " + inputFoodPreco.value;
        sectionFood.appendChild(foodDiv)
        console.log(foods);
    }
}

function dividirConta(produtos, clientes) {
    let totalGasto = 0;
    const taxaServico = 0.1;

    for (let produto of produtos) {
        totalGasto += produto.preco;
    }
  
    const valorPorPessoa = {};
    for (let cliente of clientes) {
        let valorGastoCliente = 0;
        for (let produto of produtos) {
        if (produto.consumidoPor.includes(cliente.nome)) {
            valorGastoCliente += (produto.preco / produto.consumidoPor.length);
            }
        }

        if (cliente.taxaServico) valorGastoCliente += valorGastoCliente * taxaServico;

        valorPorPessoa[cliente.nome] = valorGastoCliente.toFixed(2);
    }
  
    return valorPorPessoa;
}



function criarDivComCheckbox() {
    container.innerHTML = "";
    // Percorrer o array de membros
    foods.forEach((food) => {
        // Criar a div para cada membro
        const divMembro = document.createElement("div");
        divMembro.setAttribute("id", food.nome);
        const paragraph = document.createElement("p");
        paragraph.style.marginRight = "10px";
        paragraph.style.display = "inline-block"
        paragraph.innerHTML = food.nome;
        divMembro.appendChild(paragraph);
        divMembro.style.marginBottom = "5px";

        people.forEach ((person) => {
            const checkbox = document.createElement("input");
            const divCheckbox = document.createElement("div");
            divCheckbox.style.display = 'inline-block'
            const para = document.createElement("p")
            para.innerHTML = person.nome;
            para.style.margin = "10px"
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("id", person.nome);
            checkbox.name = person.nome;
            divCheckbox.appendChild(para);
            divCheckbox.appendChild(checkbox);
            divMembro.appendChild(divCheckbox);
        }) 


        container.appendChild(divMembro);
    });
}

btnPeople.onclick =  () => {
    addPeople();
    inputPeople.value = "";
    document.getElementById("taxaServicoCheckbox").checked = false
}

btnFood.onclick =  () => {
    addFood();
    inputFood.value = "";
    inputFoodPreco.value = "";
}

btnGerar.onclick = () => {
    if (!people.length == 0 && !foods.length == 0) {
        btnCheckbox.disabled = false;
        criarDivComCheckbox();
    } else if(people.length == 0  && !foods.length == 0) {
        alert("Insira algumas pessoas!");
    } else if (!people.length == 0  && foods.length == 0) {
        alert("Insira algumas comidas!");
    } else {
        alert("Insira algumas pessoas e comidas!");
    }
}

btnCheckbox.onclick = () => {
    for (let food of foods) {
        let consumido = []

        var div = document.getElementById(food.nome);

        for (let person of people) {
            var checkbox = div.querySelector("#" + person.nome)
            if (checkbox.checked) consumido.push(checkbox.name);
        }

        food.consumidoPor = consumido;
    }

    sectionPeople.innerHTML = JSON.stringify(dividirConta(foods, people));
    sectionFood.innerHTML = " ";

    btnCheckbox.disabled = true;

    console.log(dividirConta(foods, people));
}

btnReset.onclick = () => {
    while(people.length != 0) people.pop();
    while(foods.length != 0) foods.pop();
    container.innerHTML = "";
    container.innerHTML = "";
    sectionFood.innerHTML = "Comidas adicionadas:  ";
    sectionPeople.innerHTML = "Pessoas adicionadas: ";
    btnCheckbox.disabled = true;
}






