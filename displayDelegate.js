function prepareDelegate(){
    const delegate = {
        messageFinishedDisplaying: (message) => {
            let tagToSet = message.extras.tagToSet || null
            tagToSet ? addTagsFromScene(tagToSet) : null
        }
    }
    return delegate
}

async function addTagsFromScene(tagToSet){
    const sdk = await UA
    const contact = await sdk.contact;
    const editor = await contact.editTags();
    editor.add("Device", tagToSet).apply()
    console.log("set tags on contact")
}

async function addDelegate(){
    const sdk = await UA
    let delegate = prepareDelegate()
    sdk.components.inAppAutomation.setDisplayDelegate(delegate)
    console.log("delegate set")
}

addDelegate()