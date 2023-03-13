import ModelCanvas from "../components/ModelCanvas";

function Example() {
    const options = {
        labels: false,
        splitMode: false,
        globalYearControl: true,
        modelControls: true,
        wireframeMode: true,
        outlines: false,
        modelInfo: false,
        modelZoom: true,
        zoomButtons: true,
        timeline: true,
        fullwidth: true,
        timelineLabels: true,
        examplePicker: true
    }
    
    return(
        <>
            <ModelCanvas options={options} />
        </>
    )
}

export default Example;