function prepareDelegate(){
    const delegate = {
        messageFinishedDisplaying: (message) => {
            console.log(message)
        }
    }
    return delegate
}

async function addDelegate(){
    const sdk = await UA
    let delegate = prepareDelegate()
    sdk.components.inAppAutomation.setDisplayDelegate(delegate)
    console.log("delegate set")
}

addDelegate()