const mongoose = require("mongoose");
const io = require("socket.io")(3001, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});
const Document = require("./models/document");

mongoose.connect("mongodb://localhost/google-docs");

const availableDocs = ["doc1", "doc2", "doc3", "doc4", "doc5"];

const getDocsSizes = async () => {
  const sizes = {};
  for (const availableDoc of availableDocs) {
    const ids = await io.in(availableDoc).allSockets();
    sizes[availableDoc] = ids.size;
  }
  return sizes;
};

io.on("connection", async (socket) => {
  socket.emit("user-count", await getDocsSizes());

  socket.on("get-document", async (documentId) => {
    const document = await findOrCreateDoc(documentId);
    socket.join(documentId);

    socket.broadcast.emit("user-count", await getDocsSizes());

    socket.emit("load-document", document.data);

    socket.on("disconnect", async () => {
      socket.broadcast.emit("user-count", await getDocsSizes());
    });

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });
});

async function findOrCreateDoc(id) {
  if (id == null) return;

  const doc = await Document.findById(id);
  if (doc) return doc;
  return await Document.create({ _id: id, data: "" });
}
