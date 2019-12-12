const compartment = {
	_id,
	name: 'ATM',
	creditBalance: 15000, //so du co o thoi diem tao ngan vi
	owner,
}

const money = {
	_id,
	name: 'Tien luong',
	compartment, // note nay thuoc ve ngan vi nao
	owner
}

const action = {
	_id,
	name: 'Sinh hoat',
	value: 10000, // so tien
	isPlus: false, // co phai khoan cong hay khong
	note, // action thuoc ve khoan tien nao
	owner,
}

// const actionTemplate