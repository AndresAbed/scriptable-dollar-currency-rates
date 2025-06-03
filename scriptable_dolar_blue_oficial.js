// Fetch API data
const url = `https://api.bluelytics.com.ar/v2/latest`
const response = new Request(url)
const data = await response.loadJSON()

// Blue values
const blueBuy = data.blue.value_buy.toFixed(2)
const blueSell = data.blue.value_sell.toFixed(2)

// Oficial values
const oficialBuy = data.oficial.value_buy.toFixed(2)
const oficialSell = data.oficial.value_sell.toFixed(2)

// Date formatting
const timeFormatter = new DateFormatter()
timeFormatter.dateFormat = 'dd/MM/yyyy HH:mm'

// Load background image
const bgReq = new Request("https://i.ibb.co/P6SZwZt/14731307-rm218-bb-07.jpg")
let bgImage = await bgReq.loadImage()

// Decide which to show: even minute = blue, odd = oficial
const currentMinute = new Date().getMinutes()
const showBlue = currentMinute % 2 === 0

// Set values accordingly
const type = showBlue ? "Dólar Blue" : "Dólar Oficial"
const titleColor = showBlue ? Color.blue() : Color.green()
const buy = showBlue ? blueBuy : oficialBuy
const sell = showBlue ? blueSell : oficialSell

// Build and show widget
let widget = createWidget(type, buy, sell, bgImage, titleColor)

if (config.runsInWidget) {
  Script.setWidget(widget)
  Script.complete()
} else {
  widget.presentSmall()
}

// Widget layout
function createWidget(title, valueBuy, valueSell, bgImage, titleColor) {
  let widget = new ListWidget()
  widget.backgroundColor = new Color("#1a1a1a")
  widget.backgroundImage = bgImage

  let staticText = widget.addText(title)
  staticText.textColor = titleColor
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

  let lastDate = widget.addText(timeFormatter.string(new Date()))
  lastDate.textColor = Color.gray()
  lastDate.font = Font.mediumSystemFont(10)
  lastDate.centerAlignText()

  widget.setPadding(0, 0, 0, 0)
  return widget
}
