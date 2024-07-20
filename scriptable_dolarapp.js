const url = `https://api.dolarapp.com/v1/tickers?currencies=ARS`
const response = new Request(url)
const data = await response.loadJSON()
const valueBuy = parseFloat(data[0].bid).toFixed(2)
const valueSell = parseFloat(data[0].ask).toFixed(2)
const timeFormatter = new DateFormatter()
timeFormatter.dateFormat = 'dd/MM/yyyy HH:mm'

let widget = createWidget(valueBuy, valueSell)
if (config.runsInWidget) {
  // create and show widget
  Script.setWidget(widget)
  Script.complete()
} else {
  widget.presentSmall()
}

// Assemble widget layout
function createWidget(valueBuy, valueSell) {
  let widget = new ListWidget()
  widget.backgroundColor = new Color("#1a1a1a")
  //widget.url = 'https://www.dolarapp.com/es-AR' Sets a URL to be redirected when tapping on the widget

  let staticText = widget.addText("DolarApp")
  staticText.textColor = Color.green()
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
  let lastDate = widget.addText(timeFormatter.string(new Date()))
  lastDate.textColor = Color.gray()
  lastDate.font = Font.mediumSystemFont(10)
  lastDate.centerAlignText()

  widget.setPadding(0, 0, 0, 0)
  return widget
}
