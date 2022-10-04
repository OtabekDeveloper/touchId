const Works = require("./model");
const { bot } = require("../telegram/telegram2");

module.exports = {
  addNew: async function (req, res) {
    try {
      let result = await Works.create(req.body);
      if (!result) {
        return res.status(400).send("yaratishda hato");
      }
      return res.status(201).send(result);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  getWorks: async function (req, res) {
    try {
      let Works = await Works.find({});
      return res.status(200).send(Works);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  getWorkId: async function (req, res) {
    try {
      let Work = await Works.findById(req.params.id);
      return res.status(200).send(Work);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  deleteWorks: async function (req, res) {
    try {
      let worksId = req.params.id;
      let result = await Works.findByIdAndDelete(worksId);
      return res.status(200).send(result);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  updateWorks: async function (req, res) {
    try {
      let worksId = req.params.id;
      let result = await Works.findByIdAndUpdate(worksId, req.body);
      return res.status(200).send(result);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  answer: async function (req, res) {
    try {
      const { workId, title, media } = req.body;
      let work = await Works.findOne({ workId: workId });
      if (!work) {
        return res.status(400).send("work not found");
      }

      work.resp.push({
        media: media,
        title: title,
      });

      let result = await Works.findByIdAndUpdate(
        work._id,
        {
          resp: work.resp,
        },
        { new: true }
      );

      if (result) {
        let files = [];
        let foo = result.resp.pop();
        foo.media;

        let caption = `\n
✅ Siz jo'natgan : #${result.workId} raqamli ish ko'rib chiqildi\n
🗒 Natija sizni qoniqtirdimi 
            `;
        foo.media[0].caption = caption;
        console.log(foo.media);
        await bot.sendMediaGroup(result.chatId, foo.media);
      }

      return res.status(200).send(result);
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  },
};
