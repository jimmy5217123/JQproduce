'use strict';

const e = React.createElement
const label = 'Josh Perez'

const optionArray =  [
    {
        value: 'DeltaEventIndexes',
        text: '台達M30A相同modbus table'
    },
    {
        value: 'HUAWEISUN2000EventIndexes',
        text: '華為SUN2000'
    }
]

const radioArray =[
    {
        value: 1,
        text: '是'
    },
    {
        value: 0,
        text: '否'
    }
]

class InputComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.type === 'text' ? '' : 0 
        }
    }
    handleChange(event) {
        this.setState({value: event.target.value})
        if (!this.props.noValue) {
            this.props[this.props.id](this.props.type === 'number' ? Number(event.target.value) : event.target.value, this.props.id)
        }
    }

    render() {
        return (
            <div>
                <label>{this.props.label}:
                    <input id={this.props.id} label={this.props.label} type={this.props.type} value={this.state.value} name={this.props.name ? this.props.name : null} onChange={(e) => this.handleChange(e)}></input>
                </label>
            </div>
        )
    }
}

class SelectComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.option[0].value
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value})
        if (!this.props.noValue) {
            this.props[this.props.id](event.target.value, this.props.id)
        }
    }

    render() {
        return (
            <div>
                <label>{this.props.label}:
                    <select value={this.state.value} onChange={(e) => this.handleChange(e)}>
                        {this.props.option.map((x, idx) => <option key={idx} value={x.value}>{x.text}</option>)}
                    </select>
                </label>
            </div>
        )
    }
}

function invCapInput (length) {
    const lengthArray = Array.from({length}, (v, i) => v = 0)
    return (
        lengthArray.map((x, idx) => <InputComponent key={idx} id={`inv${idx + 1}`} label={`inv${idx + 1}`} name='invInputArray' noValue={true} value={Number(x.value)} type="number" />)
    )
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            factoryName: "",
            factoryNumber: "",
            invLength: 0,
            maxPvLength: 0,
            irrLength: 0,
            INVevent: 'DeltaEventIndexes',
            HVMeter: 1,
            LVMeter: 1,
            Anemometer: 1,
            Waterlevel: 1,
            ENVtemp: 1,
            PVtemp: 1,
            invInput: [],
            JQtext: ''
        };
    }
    getValue = (value, id) => {
        this.setState({
            [id]: value
        })
    }

    getAllData () {
        const dataObj = this.state
        const invInput = document.getElementsByName('invInputArray')
        const invArray = [] 
        for (let i = 0; i < invInput.length; i++) {
            invArray.push(Number(invInput[i].value))
        }
        dataObj.invInput = invArray
        console.log(dataObj)
        this.setState({
            JQtext: calculate(e, dataObj)
        })
        console.log(this.state.JQtext)
    }

    render() {
        return (
            <div>
                <div>
                    <InputComponent id="factoryName" label="案場名稱" type="text" factoryName={this.getValue}/>
                    <InputComponent id="factoryNumber" label="案場編號" type="text" factoryNumber={this.getValue}/>
                    <InputComponent id="maxPvLength" label="單台INV最大MPPT/PV數量" type="number" maxPvLength={this.getValue}/>
                    <InputComponent id="irrLength" label="日照計數量:(若無則填0)" type="number" irrLength={this.getValue}/>
                    <SelectComponent id="HVMeter" label="是否有高壓盤" option={radioArray} HVMeter={this.getValue}/>
                    <SelectComponent id="LVMeter" label="是否有低壓盤" option={radioArray} LVMeter={this.getValue}/>
                    <SelectComponent id="Anemometer" label="是否有風速計" option={radioArray} Anemometer={this.getValue}/>
                    <SelectComponent id="Waterlevel" label="是否有水位計" option={radioArray} Waterlevel={this.getValue}/>
                    <SelectComponent id="ENVtemp" label="是否有環溫錶頭" option={radioArray} ENVtemp={this.getValue}/>
                    <SelectComponent id="PVtemp" label="是否有模組溫度錶頭" option={radioArray} PVtemp={this.getValue}/>
                    <SelectComponent id="INVevent" label="INV型號" option={optionArray} INVevent={this.getValue}/>
                    <InputComponent id="invLength" label="INV數量" type="number" invLength={this.getValue}/>
                </div>
                <div>
                    {invCapInput(this.state.invLength)}
                </div>
                <div>
                    <button onClick={() => this.getAllData()}>get all data</button>
                </div>
                <div>{this.state.JQtext}</div>
            </div>
        )
    }
}

const textInputContainer = document.querySelector('#textInput')
ReactDOM.render(<App/>, textInputContainer)




function calculate(event, data) {
    // message_box.stop();
    // 定義函數內部可被使用的變數。

    console.log(data)
    // 假使被輸入了無法順利轉換成為數值的字串內容的話，內建函數 Number  就會傳回「並不是一個數值 (NaN, not a number)」...。
    var AllCapacity, INVNumber, MPPTNumber, LocateName, LocateID, IRRNumber, INVevent, HVMeter, LVMeter, PV_P, POWER_S, POWER_R, POWER_T, EFF;
    var Waterlevel, Anemometer, ENVtemp, PVtemp;
    LocateName = data.factoryName;
    LocateID = data.factoryNumber;
    INVNumber = data.invLength;
    MPPTNumber = data.maxPvLength;
    IRRNumber = data.irrLength;
    INVevent = data.INVevent
    HVMeter = data.HVMeter
    LVMeter = data.LVMeter
    Anemometer = data.Anemometer
    Waterlevel = data.Waterlevel
    ENVtemp = data.ENVtemp
    PVtemp = data.PVtemp
    AllCapacity = data.invArray
    PV_P = `GenerateByIndex("inv_"; .inverterIndexes; "pv_p"; .PVIndexes; .data)`
    POWER_R = `GenerateA("inv_"; .inverterIndexes; "power_r"; .data)`
    POWER_S = `GenerateA("inv_"; .inverterIndexes; "power_s"; .data)`
    POWER_T = `GenerateA("inv_"; .inverterIndexes; "power_t"; .data)`
    EFF = `GenerateA("inv_"; .inverterIndexes; "Eff"; .data)`
    switch (INVevent) {
        case "HUAWEISUN2000EventIndexes":
            PV_P = `GenerateCalculateABCrossorByIndexanddivide1000("inv_"; .inverterIndexes; "pv_a"; "pv_v"; .PVIndexes; .data)`
            POWER_R = `GenerateABDivisor("inv_"; .inverterIndexes; "Vrs"; "Rc"; 1.73; .data)`
            POWER_S = `GenerateABDivisor("inv_"; .inverterIndexes; "Vst"; "Sc"; 1.73; .data)`
            POWER_T = `GenerateABDivisor("inv_"; .inverterIndexes; "Vrt"; "Tc"; 1.73; .data)`
            break;
        case "SolarEventIndexes":
            EFF = `GenerateADivideB("inv_"; .inverterIndexes; "acp"; "dcp"; .data)`
            break;
    }
    console.log(HVMeter)
    console.log(LVMeter)
    console.log(Anemometer)
    console.log(Waterlevel)
    console.log(POWER_R)
    console.log(POWER_S)
    console.log(POWER_T)
    console.log(EFF)
    var IRRValue = ``
    var IRRErrorMessage = ``
    if (IRRNumber == 0) {
        IRRErrorMessage = ``
        IRRValue = `[null]`
    }
    else {
        IRRErrorMessage = `IRR: GenerateINVStatus("IRR_"; .iRRIndexes; .data),`
        IRRValue = `GenerateA("IRR_"; .iRRIndexes; "IRR"; .data)`
    }
    var PVtempValue = ``
    var PVtempErrorMessage = ``
    if (PVtemp == 1) {
        PVtempValue = `Generate("PV_TEMP"; "temp"; .data)`
        PVtempErrorMessage = `PVTemp: GenerateStatus("PV_TEMP";.data),`
    }
    else {
        PVtempValue = `null`
    }
    var ENVtempValue = ``
    var ENVtempErrorMessage = ``
    if (ENVtemp == 1) {
        ENVtempValue = `Generate("ENV_TEMP"; "temp"; .data)`
        ENVtempErrorMessage = `ENVtemp: GenerateStatus("ENV_TEMP";.data),`
    }
    else {
        ENVtempValue = `null`
    }
    var WaterlevelMessage = ``
    var WaterlevelErrormessage = ``
    if (Waterlevel == 1) {
        WaterlevelMessage = `Waterlevel: Generate("Waterlevel"; "Measurement_output_value"; .data),`
        WaterlevelErrormessage = `Waterlevel: GenerateStatus("Waterlevel";.data),`
    }
    var AnemometerMessage = ``
    var AnemometerErrormessage = ``
    if (Anemometer == 1) {
        AnemometerMessage = `Anemometer: Generate("Anemometer"; "Wind_speed"; .data),`
        AnemometerErrormessage = `Anemometer: GenerateStatus("Anemometer";.data),`
    }
    var Errormessage = ``
    var etc = ``
    if (HVMeter == 1 && LVMeter == 1) {
        Errormessage = `
    HV_Meter: GenerateStatus("HV_meter";.data),
    LV_Meter: GenerateStatus("LV_meter";.data),`
        etc = `etc:
        {
            "HV-meter": {
                Vln_a: Generate("HV_meter"; "Vln_a"; .data),
                Vln_b: Generate("HV_meter"; "Vln_b"; .data),
                Vln_c: Generate("HV_meter"; "Vln_c"; .data),
                Vll_ab: Generate("HV_meter"; "Vll_ab"; .data),
                Vll_bc: Generate("HV_meter"; "Vll_bc"; .data),
                Vll_ca: Generate("HV_meter"; "Vll_ca"; .data),
                I_a: Generate("HV_meter"; "I_a"; .data),
                I_b: Generate("HV_meter"; "I_b"; .data),
                I_c: Generate("HV_meter"; "I_c"; .data),
                Freq: Generate("HV_meter"; "freq"; .data),
                P: Generate("HV_meter"; "P"; .data),
                KVAR_tot: Generate("HV_meter"; "Q"; .data),
                KVA_tot: Generate("HV_meter"; "S"; .data)
            },
            "LV-meter": {
                Vln_a: Generate("LV_meter"; "Vln_a"; .data),
                Vln_b: Generate("LV_meter"; "Vln_b"; .data),
                Vln_c: Generate("LV_meter"; "Vln_c"; .data),
                Vll_ab: Generate("LV_meter"; "Vll_ab"; .data),
                Vll_bc: Generate("LV_meter"; "Vll_bc"; .data),
                Vll_ca: Generate("LV_meter"; "Vll_ca"; .data),
                I_a: Generate("LV_meter"; "I_a"; .data),
                I_b: Generate("LV_meter"; "I_b"; .data),
                I_c: Generate("LV_meter"; "I_c"; .data),
                Freq: Generate("LV_meter"; "freq"; .data),
                P: Generate("LV_meter"; "P"; .data),
                KVAR_tot: Generate("LV_meter"; "Q"; .data),
                KVA_tot: Generate("LV_meter"; "S"; .data)
            }
            
        },`
    }
    else if (HVMeter == 1 && LVMeter == 0) {
        Errormessage = `HV_Meter: GenerateStatus("HV_meter";.data),`
        etc = `etc:
        {
            "HV-meter": {
                Vln_a: Generate("HV_meter"; "Vln_a"; .data),
                Vln_b: Generate("HV_meter"; "Vln_b"; .data),
                Vln_c: Generate("HV_meter"; "Vln_c"; .data),
                Vll_ab: Generate("HV_meter"; "Vll_ab"; .data),
                Vll_bc: Generate("HV_meter"; "Vll_bc"; .data),
                Vll_ca: Generate("HV_meter"; "Vll_ca"; .data),
                I_a: Generate("HV_meter"; "I_a"; .data),
                I_b: Generate("HV_meter"; "I_b"; .data),
                I_c: Generate("HV_meter"; "I_c"; .data),
                Freq: Generate("HV_meter"; "freq"; .data),
                P: Generate("HV_meter"; "P"; .data),
                KVAR_tot: Generate("HV_meter"; "Q"; .data),
                KVA_tot: Generate("HV_meter"; "S"; .data)
            }
        },`
    }
    else if (HVMeter == 0 && LVMeter == 1) {
        Errormessage = `LV_Meter: GenerateStatus("LV_meter";.data),`
        etc = `etc:
        {
            "LV-meter": {
                Vln_a: Generate("LV_meter"; "Vln_a"; .data),
                Vln_b: Generate("LV_meter"; "Vln_b"; .data),
                Vln_c: Generate("LV_meter"; "Vln_c"; .data),
                Vll_ab: Generate("LV_meter"; "Vll_ab"; .data),
                Vll_bc: Generate("LV_meter"; "Vll_bc"; .data),
                Vll_ca: Generate("LV_meter"; "Vll_ca"; .data),
                I_a: Generate("LV_meter"; "I_a"; .data),
                I_b: Generate("LV_meter"; "I_b"; .data),
                I_c: Generate("LV_meter"; "I_c"; .data),
                Freq: Generate("LV_meter"; "freq"; .data),
                P: Generate("LV_meter"; "P"; .data),
                KVAR_tot: Generate("LV_meter"; "Q"; .data),
                KVA_tot: Generate("LV_meter"; "S"; .data)
            }
        },`
    }
    else if (HVMeter == 0 && LVMeter == 0) {
        Errormessage = ``
        etc = ``
    }
    console.log(Errormessage)
    console.log(INVevent)
    const INVARR = []
    for (let i = 1; i <= INVNumber; i++) {
        if (i < 10) {
            INVARR.push(`"0${i}"`)
        } else {
            INVARR.push(`"${i}"`)
        }

    }
    const MPPTARR = []
    for (let i = 1; i <= MPPTNumber; i++) {
        MPPTARR.push(`"${i}"`)
    }
    const IRRARR = []
    for (let i = 1; i <= IRRNumber; i++) {
        if (i < 10) {
            IRRARR.push(`"0${i}"`)
        } else {
            IRRARR.push(`"${i}"`)
        }
    }
    const EVENTARR = []
    for (let i = 1; i <= INVNumber; i++) {
        if (i < 10) {
            EVENTARR.push(`EventOneArray("inv_0${i}"; .${INVevent}; .data)`)
        } else {
            EVENTARR.push(`EventOneArray("inv_${i}"; .${INVevent}; .data)`)
        }
    }


    console.log(INVARR);
    console.log(MPPTARR);
    console.log(IRRARR);
    // if (event.target.id = "calculate_button");
// const checkarr = [LocateName, LocateID, INVNumber, MPPTNumber]
// const check = checkarr.every(x => x !== '' && x !== 0)
// if (!check) return

return `def FormatFloat: . * 100 | floor | . / 100;
def GenerateCapacity($source_indexes):
map(   
$source_indexes
)
;
def GenerateINVStatus($source_prefix; $source_indexes; $data):
$source_indexes | map(
if $data."\\($source_prefix+(.|tostring))".status !=0 then "設備斷訊" else 0 end
)
;
def GenerateStatus($source_prefix; $data):
(
if $data."\\($source_prefix)".status !=0 then "設備斷訊" else 0 end
)
;
def EventOneArray($source_prefix; $event_indexes; $data):
$event_indexes | map(
if $data."\\($source_prefix)".status == 0 then $data."\\($source_prefix)"."\\((.|tostring))" else -1 end
)
;
def GenerateEvent($source_prefix; $source_indexes; $a; $data):
$source_indexes | map(
if $data."\\($source_prefix+(.|tostring))".status == 0 then
    $data."\\($source_prefix+(.|tostring))"."\\($a)" | FormatFloat
else 0 end
)
;
def Generate($source; $tag_prefix; $data):
(
if $data."\\($source)".status == 0 then
(
if ($data."\\($source)"."\\($tag_prefix)" ) != null
then
($data."\\($source)"."\\($tag_prefix)") | FormatFloat
else
($data."\\($source)"."\\($tag_prefix)")
end
)
else 0 end
)
;
def GenerateConstSourceByIndex($source; $tag_prefix; $tag_indexes; $data):
(
(
$tag_indexes | map(
    if $data."\\($source)".status == 0 then (
        if
        ($data."\\($source)"."\\($tag_prefix+(.|tostring))") != null
        then
        $data."\\($source)"."\\($tag_prefix+(.|tostring))"| FormatFloat
        else ($data."\\($source)"."\\($tag_prefix+(.|tostring))")
        end )
    else 0 end
)
)
)
;
def GenerateByIndex($source_prefix; $source_indexes; $tag_prefix; $tag_indexes; $data):
$source_indexes | map(
GenerateConstSourceByIndex($source_prefix+(.|tostring); $tag_prefix; $tag_indexes; $data)
)
;
def GenerateA($source_prefix; $source_indexes; $a; $data):
$source_indexes | map(
if $data."\\($source_prefix+(.|tostring))".status == 0 then(
    if ($data."\\($source_prefix+(.|tostring))"."\\($a)" ) > 0 
    then
    $data."\\($source_prefix+(.|tostring))"."\\($a)" | FormatFloat
    else 0 end )
else 0 end
)
;
def GenerateABDivisor($source_prefix; $source_indexes; $a; $b; $divisor; $data):
$source_indexes | map(
if $data."\\($source_prefix+(.|tostring))".status == 0 then
(
    if (( $data."\\($source_prefix+(.|tostring))"."\\($a)" ) != 0 and ( $data."\\($source_prefix+(.|tostring))"."\\($b)") != 0)
    then
    $data."\\($source_prefix+(.|tostring))"."\\($a)" * $data."\\($source_prefix+(.|tostring))"."\\($b)" / $divisor | FormatFloat
    else 0 end
)
else 0 end
)
;
def GenerateACrossor($source_prefix; $source_indexes; $a; $crossor; $data):
$source_indexes | map(
if $data."\\($source_prefix+(.|tostring))".status == 0 then
    $data."\\($source_prefix+(.|tostring))"."\\($a)" * $crossor | FormatFloat
else 0 end
)
;
def GeneratetempSourceByIndex($source; $tag_prefix; $tag_indexes; $data):
$tag_indexes | map(
if $data."\\($source)".status == 0 then
    $data."\\($source)"."\\($tag_prefix)" | FormatFloat
else 0 end
)
;
def GenerateOnlyOneTempIndex($source_prefix; $source_indexes; $tag_prefix; $tag_indexes; $data):
$source_indexes | map(
GeneratetempSourceByIndex($source_prefix+(.|tostring); $tag_prefix; $tag_indexes; $data)
)
;
def GenerateABCrossor($source; $tag_prefix_a; $tag_prefix_b; $tag_indexes; $data):
(
(
$tag_indexes | map(
    if $data."\\($source)".status == 0 then (
        if
        ($data."\\($source)"."\\($tag_prefix_a+(.|tostring))") != null 
        then
        $data."\\($source)"."\\($tag_prefix_a+(.|tostring))" * $data."\\($source)"."\\($tag_prefix_b+(.|tostring))"| FormatFloat
        else "-1" end )
    else 0 end
)
) | map(select(. != "-1"))
)
;
def GenerateCalculateABCrossorByIndex($source_prefix; $source_indexes; $tag_a; $tag_b; $tag_indexes; $data):
$source_indexes | map(
GenerateABCrossor($source_prefix+(.|tostring); $tag_a; $tag_b; $tag_indexes; $data)
)
;
def GenerateABCrossoranddivide1000($source; $tag_prefix_a; $tag_prefix_b; $tag_indexes; $data):
(
(
$tag_indexes | map(
    if $data."\\($source)".status == 0 then (
        if
        ($data."\\($source)"."\\($tag_prefix_a+(.|tostring))") and ($data."\\($source)"."\\($tag_prefix_b+(.|tostring))") != null 
        then
        $data."\\($source)"."\\($tag_prefix_a+(.|tostring))" * $data."\\($source)"."\\($tag_prefix_b+(.|tostring))" / 1000 | FormatFloat
        else 
        ($data."\\($source)"."\\($tag_prefix_a+(.|tostring))")
        end )
    else 0 end
)
) 
)
;
def GenerateCalculateABCrossorByIndexanddivide1000($source_prefix; $source_indexes; $tag_a; $tag_b; $tag_indexes; $data):
$source_indexes | map(
GenerateABCrossoranddivide1000($source_prefix+(.|tostring); $tag_a; $tag_b; $tag_indexes; $data)
)
;
def GenerateADivideB($source_prefix; $source_indexes; $a; $b; $data):
$source_indexes | map(
if $data."\\($source_prefix+(.|tostring))".status == 0 then
(
    if (( $data."\\($source_prefix+(.|tostring))"."\\($a)" ) != 0 and ( $data."\\($source_prefix+(.|tostring))"."\\($b)") != 0)
    then
    $data."\\($source_prefix+(.|tostring))"."\\($a)" / $data."\\($source_prefix+(.|tostring))"."\\($b)" | FormatFloat
    else 0 end
)
else 0 end
)
;
{
inverterIndexes: [${INVARR}],
PVIndexes: [${MPPTARR}],
iRRIndexes: [${IRRARR}],
invTempIndexes: [1],
capacityIndexes:[${AllCapacity}],
DeltaEventIndexes:["alarm_E1","alarm_E2","alarm_E3","alarm_W1","alarm_W2","alarm_F1","alarm_F2","alarm_F3","alarm_F4","alarm_F5"],
SolarEventIndexes:["event_Gb","event_M1","event_M2","event_M3"],
HUAWEISUN2000EventIndexes:["event_1","event_2","event_3"],
data: .
} |
{
factoryName: "${LocateName}",
timestamp: (now+28800|strftime("%Y-%m-%dT%H:%M:%SZ")),
detail:
{
factoryId: "${LocateID}",
factoryName: "${LocateName}",
pv_v: GenerateByIndex("inv_"; .inverterIndexes; "pv_v"; .PVIndexes; .data),
pv_a: GenerateByIndex("inv_"; .inverterIndexes; "pv_a"; .PVIndexes; .data),
pv_p: ${PV_P},
PF: GenerateA("inv_"; .inverterIndexes; "PF"; .data),
Vrn: GenerateA("inv_"; .inverterIndexes; "Vrs"; .data),
Vsn: GenerateA("inv_"; .inverterIndexes; "Vst"; .data),
Vtn: GenerateA("inv_"; .inverterIndexes; "Vrt"; .data),
Rc: GenerateA("inv_"; .inverterIndexes; "Rc"; .data),
Sc: GenerateA("inv_"; .inverterIndexes; "Sc"; .data),
Tc: GenerateA("inv_"; .inverterIndexes; "Tc"; .data),
Eff: ${EFF},
temp: GenerateOnlyOneTempIndex("inv_"; .inverterIndexes; "temp"; .invTempIndexes; .data),
State: GenerateA("inv_"; .inverterIndexes; "State"; .data),
acp: GenerateA("inv_"; .inverterIndexes; "acp"; .data),
dcp: GenerateA("inv_"; .inverterIndexes; "dcp"; .data),
E_today: GenerateA("inv_"; .inverterIndexes; "E_today"; .data),
AC_kWh: GenerateA("inv_"; .inverterIndexes; "AC_kwh"; .data),
freq: GenerateA("inv_"; .inverterIndexes; "freq"; .data),
event: [
    ${EVENTARR}
  ],
power_r: ${POWER_R},
power_s: ${POWER_S},
power_t: ${POWER_T},
capacity: (.capacityIndexes),
IRR: ${IRRValue},
PVTemp: ${PVtempValue},
ENVTemp: ${ENVtempValue},
${WaterlevelMessage}
${AnemometerMessage}
ErrorMessage:
    {
    inv: GenerateINVStatus("inv_"; .inverterIndexes; .data),
    ${IRRErrorMessage}
    ${PVtempErrorMessage}
    ${ENVtempErrorMessage}
    ${Errormessage}
    ${WaterlevelErrormessage}
    ${AnemometerErrormessage}
    },
${etc}
SYSTIME: (now | floor | tostring)
}
}`;
}