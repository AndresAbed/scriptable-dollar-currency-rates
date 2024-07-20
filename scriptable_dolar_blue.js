const url = `https://api.bluelytics.com.ar/v2/latest`
const response = new Request(url)
const data = await response.loadJSON()
const valueBuy = data.blue.value_buy.toFixed(2);
const valueSell = data.blue.value_sell.toFixed(2);
const timeFormatter = new DateFormatter();
timeFormatter.dateFormat = 'dd/MM/yyyy HH:mm';
const bgReq= new Request ("https://i.ibb.co/P6SZwZt/14731307-rm218-bb-07.jpg")
let bgImage = await bgReq.loadImage()

let widget = createWidget(valueBuy, valueSell, bgImage)
if (config.runsInWidget) {
  // create and show widget
  Script.setWidget(widget)
  Script.complete()
} else {
  widget.presentSmall()
}

// Assemble widget layout
function createWidget(valueBuy, valueSell, bgImage) {
  let widget = new ListWidget()
  widget.backgroundColor = new Color("#1a1a1a")
  widget.backgroundImage = bgImage
  //widget.url = 'https://bluelytics.com.ar/#!/'; Sets a URL to be redirected when tapping over the widget

  let staticText = widget.addText("Dolar Blue")
  staticText.textColor = Color.blue()
  staticText.font = Font.boldSystemFont(16)
  staticText.centerAlignText()

  widget.addSpacer(8)

  let buyStack = widget.addStack()
  buyStack.layoutHorizontally()
  buyStack.centerAlignContent()
  buyStack.addSpacer()
  let buyLabel = buyStack.addText("Compra: ")
  buyLabel.textColor = Color.gray()
  buyLabel.font = Font.boldSystemFont(10)
  let buyValue = buyStack.addText(valueBuy)
  buyValue.textColor = Color.white()
  buyValue.font = Font.boldSystemFont(18)
  buyStack.addSpacer()

  widget.addSpacer(8)

  let sellStack = widget.addStack()
  sellStack.layoutHorizontally()
  sellStack.centerAlignContent()
  sellStack.addSpacer()
  let sellLabel = sellStack.addText("Venta: ")
  sellLabel.textColor = Color.gray()
  sellLabel.font = Font.boldSystemFont(10)
  let sellValue = sellStack.addText(valueSell)
  sellValue.textColor = Color.white()
  sellValue.font = Font.boldSystemFont(18)
  sellStack.addSpacer()

  widget.addSpacer(8)

  // Show last update
  let lastDate = widget.addText(timeFormatter.string(new Date()));
  lastDate.textColor = Color.gray()
  lastDate.font = Font.mediumSystemFont(10)
  lastDate.centerAlignText();

  widget.setPadding(0, 0, 0, 0)
  return widget
}
