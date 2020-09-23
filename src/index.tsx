import { h, render } from "preact"
import { App } from "./component/App"

const dom = document.getElementById("root") as Element
render(<App />, dom)
