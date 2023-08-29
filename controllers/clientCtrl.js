const Client = require('../models/clientModel');
const Archives = require('../models/archivesModel');
const User = require('../models/userModel')


const clientCtrl = {
    getclients: async (req, res) => {
        // const cat = await AllProducts.find().sort({_id:-1}).limit((+req.query.page + 1) * req.query.pageCount)
        // res.status(200).json(cat)
        try {
            const users = await Client.find();
            const reverseusers = users.reverse()
            res.status(200).send(reverseusers);
        } catch (error) {
            console.error(error);
            res.status(500).send("serverda xatolik bor");
        }
    },
    testgetClients: async (req, res) => {
        // const cat = await AllProducts.find().sort({_id:-1}).limit((+req.query.page + 1) * req.query.pageCount)
        // res.status(200).json(cat)
        try {
            const users = await Client.find().sort({ _id: -1 }).limit(2)

            // const users = await Client.find();
            const reverseusers = users.reverse()
            res.status(200).send(reverseusers);
        } catch (error) {
            console.error(error);
            res.status(500).send("serverda xatolik bor");
        }
    },
    getsingle: async (req, res) => {
        try {
            const clientId = req.params.id;

            if (!clientId) {
                return res.status(400).send("Invalid client ID");
            }

            const client = await Client.findById(clientId);

            if (!client) {
                return res.status(404).send("client not found");
            }

            res.status(200).send(client);
        } catch (error) {
            console.error(error);
            res.status(500).send("Error retrieving client");
        }
    },
    deleteClient: async (req, res) => {
        try {
            const clientId = req.params.id;

            if (!clientId) {
                return res.status(400).send("mijoz topilmadi");
            }
            const getclient = await Client.findById(clientId);
            const newclient = new Archives({
                archive: getclient
            });

            await newclient.save();
            const client = await Client.findByIdAndDelete(clientId);
            if (!client) {
                return res.status(404).send("mijoz topilmadi");
            }
            res.status(200).send(`${client.name} o'chirildi.`);
        } catch (error) {
            console.error(error);
            res.status(500).send("serverda xato bor");
        }
    },
    createClient: async (req, res) => {
        try {
            const { name, lastname, coin, weekday, comments, time, teacherid, number, subject } = req.body;

            if (!lastname || !name || !coin || !weekday || !time || !teacherid || !number || !subject) {
                return res.status(400).send("Joylarni to`ldiring!");
            }

            const newComments = comments || [];
            newComments.push({
                amount: coin,
                operation: "plus"
            });


            let array = await Client.find({ teacherid: teacherid })

            let use = array.some(user => user.number === Number(number))
            if (use) {
                return res.status(400).send("bu telefon raqam oldin kiritilgan, boshqa raqam kiriting!");
            }

            const newclient = new Client({
                name,
                lastname,
                coin: coin,
                weekday,
                time,
                teacherid,
                number,
                subject,
                comments: newComments
            });

            await newclient.save();
            res.status(201).send(`${newclient.name}ni muvaffaqiyatli qo'shdingiz`);

        } catch (error) {
            console.log(error);
            res.status(500).send("serverda xatolik");
        }

    },
    updateClient: async (req, res) => {
        const { name, lastname, weekday, time, number, subject } = req.body;
        try {
            const clientId = req.params.id;

            if (!clientId) {
                return res.status(400).send("Invalid client ID");
            }

            const client = await Client.findById(clientId);

            if (!client) {
                return res.status(404).send("client not found");
            }

            client.name = name ? name : client.name
            client.lastname = lastname ? lastname : client.lastname
            client.weekday = weekday ? weekday : client.weekday
            client.time = time ? time : client.time
            client.number = number ? number : client.number
            client.subject = subject ? subject : client.subject

            await client.save();

            res.status(201).send("muvaffaqiyatli o'zgartirdingiz");
        } catch (error) {
            console.error(error);
            res.status(500).send("serverda error");
        }
    },
    minusAmount: async (req, res) => {
        try {
            const clientId = req.params.id;

            if (!clientId) {
                return res.status(400).send("Invalid client ID");
            }

            const client = await Client.findById(clientId);

            if (!client) {
                return res.status(404).send("client not found");
            }

            const comments = client.comments;
            comments.unshift({
                amount: req.body.coin,
                operation: "minus"
            });

            const amount = req.body.coin;
            client.comments = comments;
            client.coin = client.coin - Number(amount);
            await client.save();
            res.status(201).send(`${client.name}dan ${Number(amount)} ayirildi`);
            // res.status(201).send("Amount subtracted from client");
        } catch (error) {
            console.error(error);
            res.status(500).send("serverda error bor");
        }
    },
    plusAmount: async (req, res) => {
        try {
            const clientId = req.params.id;

            if (!clientId) {
                return res.status(400).send("id topilmadi");
            }

            const client = await Client.findById(clientId);

            if (!client) {
                return res.status(404).send("mijoz topilmadi");
            }

            const comments = client.comments;
            comments.unshift({
                amount: req.body.coin,
                operation: "plus"
            });

            const amount = req.body.coin;
            client.comments = comments;
            client.coin = client.coin + Number(amount);
            await client.save();

            res.status(201).send(`${client.name}ga ${Number(amount)} qo'shildi`);
        } catch (error) {
            console.error(error);
            res.status(500).send("serverda error");
        }
    },
    filterClient: async (req, res) => {
        try {
            const users = await Client.find();
            function findDuplicateUsers() {
                const phoneNumberGroups = users?.reduce((acc, user) => {
                    if (!acc[user.number]) {
                        acc[user.number] = [];
                    }
                    acc[user.number].push(user);
                    return acc;
                }, {});

                const duplicates = [];
                const singlebox = [];
                for (const phoneNumber in phoneNumberGroups) {
                    if (phoneNumberGroups[phoneNumber].length > 1) {
                        duplicates.push(phoneNumberGroups[phoneNumber]);
                    } else {
                        singlebox.push(phoneNumberGroups[phoneNumber]);
                    }
                }
                const arrays = [...duplicates, ...singlebox]
                const newArr = arrays.map(user => {
                    const box = [];
                    user.forEach(ar => box.push(ar.coin));
                    const allCoin = box.reduce((a, b) => a + b, 0);

                    return { allCoin, user };
                });
                res.send(newArr);
            }
            findDuplicateUsers()

        } catch (error) {
            console.error(error);
            res.status(500).send("serverda error");
        }
    },
}

module.exports = clientCtrl;