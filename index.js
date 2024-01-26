function handleFormSubmit(event) {
    event.preventDefault();
    const expense = event.target.expense.value;
    const description = event.target.description.value;
    const category = event.target.category.value;

    // Create expense object
    const expenseData = {
        expense,
        description,
        category
    };

    axios.post('https://crudcrud.com/api/eca297a7ea254e2d8b1d587369d80b17/expensetracker', expenseData)
        .then((response) => {
            showscreen(response.data); 
        })
        .catch((err) => {
            document.body.innerHTML += "<h4> Something went wrong</h4>"; 
            console.log(err);
        });
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get('https://crudcrud.com/api/eca297a7ea254e2d8b1d587369d80b17/expensetracker')
        .then((response) => {
            console.log(response);
            for (let i = 0; i < response.data.length; i++) {
                showscreen(response.data[i]);
            }
        })
        .catch((err) => {
            console.log(err);
        });
});


function showscreen(expenseData) {
    const parentele = document.getElementById("userList");
    const childele = document.createElement('li');
    childele.className = 'list-group-item d-flex justify-content-between align-items-center';

    const expenseDetails = document.createElement('div');
    expenseDetails.innerHTML = `<strong>Expense:</strong> ${expenseData.expense} - <strong>Description:</strong> ${expenseData.description} - <strong>Category:</strong> ${expenseData.category}`;

    const buttonsContainer = document.createElement('div');

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'btn btn-danger';
    deleteButton.textContent = 'Delete';

    deleteButton.onclick = () => {
        deleteExpense(expenseData._id, childele); 
    };

    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.className = 'btn btn-warning ms-2';
    editButton.textContent = 'Edit';
    editButton.onclick = () => {
        editExpense(expenseData, childele); 
    };

    buttonsContainer.appendChild(deleteButton);
    buttonsContainer.appendChild(editButton);

    childele.appendChild(expenseDetails);
    childele.appendChild(buttonsContainer);

    parentele.insertBefore(childele, parentele.firstChild);
}

function deleteExpense(expenseId, listItem) {
    axios.delete(`https://crudcrud.com/api/eca297a7ea254e2d8b1d587369d80b17/expensetracker/${expenseId}`)
        .then(() => {
            listItem.remove(); 
        })
        .catch((err) => {
            console.log(err);
        });
}

function editExpense(expenseData, listItem) {
    document.getElementById('expense').value = expenseData.expense;
    document.getElementById('description').value = expenseData.description;
    document.getElementById('category').value = expenseData.category;

    deleteExpense(expenseData._id, listItem);
}
