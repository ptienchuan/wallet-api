const wallet = {
    _id,
    name: "ATM",
    owner
}

const compartment = {
    _id,
    name: "Sinh hoat hang thang",
    budget: 10000000,
    wallet, // foreign key
    owner
}

const money = {
    _id,
    name: "Tien phong",
    cost: 3000000,
    spended: false,
    note,
    compartment, // foreign key
    owner
}

// const actionTemplate
