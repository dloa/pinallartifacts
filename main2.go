package main

import "fmt"
import "encoding/json"

// this is a comment

var b string  = '[`{"media-data":{"alexandria-media":{"torrent":"QmQMx79Vqt9PnQEaZEjrf3MmLbWbwH6w2EvF7U4j2xVRYQ","publisher":"FMRNXEQTBfqntxhwmXPJ1iQjEbUENPrYkZ","timestamp":1436422695000,"type":"movie","info":{"title":"Johnny Flynton","description":"Johnny Flynton is good at one thing: boxing. He's not too bright, and there's clearly some issues in his past, but what's worse, when he's boxing, his temper flares up. His wife, Samantha, tells him she's pregnant. Meanwhile, he's got an exhibition match with local boy Artie Duane. Johnny lets him get a few punches in to look good, but when Artie starts taking cheap shots, Johnny can't stand by and overreacts. He runs home, where he's in high spirits, but that proves his downfall.  Licensed CCbyncnd","year":2002,"extra-info":{"Bitcoin Address":"1C4DgBMuiGEXoDFCThNESt1QDaUM11bMSy","DHT Hash":"QmQMx79Vqt9PnQEaZEjrf3MmLbWbwH6w2EvF7U4j2xVRYQ","RottenTom":"http://www.rottentomatoes.com/m/johnny_flynton/","artist":"Lexi Alexander","creators2":"Lexi Alexander,  Fabian Marquez","filename":"johnnyflynton.mp4","runtime":2281,"tags":"Johnny, Flynton, Lexi, Alexander, Gendale, Entertainment, Boxing, Dash, Mihok, Michele Matheson","wwwId":"tt0329245"}},"payment":{"amount":"10,100,1000","currency":"USD","type":"tip"},"extras":""},"signature":"H2CNFfakHFd40OYIWQ7qJilgvbLXeKtzmkQ5ei+yx0A2GQzHue1r57VYUMfrg69rLqdtHoTvDekpIBdrxSqNbUI="},"txid":"311b50cd73f80878c3b782143f188d5caf984600554e7a236b8a5f2f0348310b","block":1262929,"publisher-name":"Lexi Alexander"}`]'


func main() {
    fmt.Println("Hello World")
    fmt.Println(b)
}
