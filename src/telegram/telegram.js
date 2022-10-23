const Order = require("../order/router")
const User = require("../user/router")
const Category = require("../category/router");

const Telegram = async () => {
    
    const callback = {
        parse_mode: "Markdown",
        reply_markup: {
          resize_keyboard: true,
          inline_keyboard: [
            [
              {
                text: "HA",
                callback_data: `ha ${result.workId}`,
              },
              {
                text: "YO'Q",
                callback_data: `yoq ${result.workId}`,
              },
            ],
          ],
        },
      };
      let addMurojat = {
        parse_mode: "Markdown",
        reply_markup: {
          resize_keyboard: true,
          one_time_keyboard: true,
          keyboard: [
            [{ text: "Texnik hodim chaqirish"}],
          ],
        },
      };


    bot.on("message", async (msg) => {
        let text = msg.text;
        let chatId = msg.chat.id;
        let contact = msg.contact;
        
        if (contact) {
          if (contact.phone_number.length == 13) {
            contact.phone_number = contact.phone_number.slice(4, 13);
          }
          if (contact.phone_number.length == 12) {
            contact.phone_number = contact.phone_number.slice(3, 13);
          }
          let user = await User.findOne({phone : contact.phone_number})

          if(!user){
            await bot.sendMessage(chatId , "Raqamingiz royhatdan o'tmagan")
          }

          if(user){
            let orderId = await Order.find({}).count()
            let body = {
              customer : user._id,
              ordernumber : orderId + 1
            }
            if(!user.chatId){
              await User.findByIdAndUpdate(user._id , {chatId : chatId})
            }
            let result = await Order.create(body)
            if(result){
              await bot.sendMessage(chatId , "Sizni murojatingiz qabul qilindi tez orada texnik hodim yetib boradi" , addMurojat)
            }
          }
        }

        if(text == "Texnik hodim chaqirish"){
          let user = await User.findOne({chatId: chatId})
          if(user){
            let orderId = await Order.find({}).count()
            let body = {
              customer : user._id,
              ordernumber : orderId + 1
            }
            let result = await Order.create(body)
            if(result){
              await bot.sendMessage(chatId , "Sizni murojatingiz qabul qilindi tez orada texnik hodim yetib boradi" , addMurojat)
            }
          }
        }

      }
    )
}

module.exports = {Telegram}