const ledger = {
	_id,
	name: 'Thang 1',
	creditBalance: 15000, //so du co o thoi diem tao ledger,
	owner,
}

const note = {
	_id,
	ledger, // note nay thuoc ve so cai nao
	name: 'Tien luong',
	owner
}

const money = {
	_id,
	note, // khoan nay thuoc ve note nao
	name: 'Sinh hoat',
	value: 10000, // so tien
	isPlus: false, // co phai khoan cong hay khong
	owner,
}

// const moneyTemplate