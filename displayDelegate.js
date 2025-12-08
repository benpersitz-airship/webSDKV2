function prepareDelegate(){
    const delegate = {
        messageFinishedDisplay: (message) => {
            console.log(message)
        }
    }
    return delegate
}

async function addDelegate(){
    const sdk = await UA
    let delegate = prepareDelegate()
    await sdk.components.inAppAutomation.setDisplayDelegate(delegate)
    console.log("delegate set")
}

addDelegate()