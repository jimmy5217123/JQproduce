'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;
var label = 'Josh Perez';

var optionArray = [{
    value: 'DeltaEventIndexes',
    text: '台達M30A相同modbus table'
}, {
    value: 'HUAWEISUN2000EventIndexes',
    text: '華為SUN2000'
}];

var radioArray = [{
    value: 1,
    text: '是'
}, {
    value: 0,
    text: '否'
}];

var InputComponent = function (_React$Component) {
    _inherits(InputComponent, _React$Component);

    function InputComponent(props) {
        _classCallCheck(this, InputComponent);

        var _this = _possibleConstructorReturn(this, (InputComponent.__proto__ || Object.getPrototypeOf(InputComponent)).call(this, props));

        _this.state = {
            value: props.type === 'text' ? '' : 0
        };
        return _this;
    }

    _createClass(InputComponent, [{
        key: 'handleChange',
        value: function handleChange(event) {
            this.setState({ value: event.target.value });
            if (!this.props.noValue) {
                this.props[this.props.id](this.props.type === 'number' ? Number(event.target.value) : event.target.value, this.props.id);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'label',
                    null,
                    this.props.label,
                    ':',
                    React.createElement('input', { id: this.props.id, label: this.props.label, type: this.props.type, value: this.state.value, name: this.props.name ? this.props.name : null, onChange: function onChange(e) {
                            return _this2.handleChange(e);
                        } })
                )
            );
        }
    }]);

    return InputComponent;
}(React.Component);

var SelectComponent = function (_React$Component2) {
    _inherits(SelectComponent, _React$Component2);

    function SelectComponent(props) {
        _classCallCheck(this, SelectComponent);

        var _this3 = _possibleConstructorReturn(this, (SelectComponent.__proto__ || Object.getPrototypeOf(SelectComponent)).call(this, props));

        _this3.state = {
            value: props.option[0].value
        };
        return _this3;
    }

    _createClass(SelectComponent, [{
        key: 'handleChange',
        value: function handleChange(event) {
            this.setState({ value: event.target.value });
            if (!this.props.noValue) {
                this.props[this.props.id](event.target.value, this.props.id);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'label',
                    null,
                    this.props.label,
                    ':',
                    React.createElement(
                        'select',
                        { value: this.state.value, onChange: function onChange(e) {
                                return _this4.handleChange(e);
                            } },
                        this.props.option.map(function (x, idx) {
                            return React.createElement(
                                'option',
                                { key: idx, value: x.value },
                                x.text
                            );
                        })
                    )
                )
            );
        }
    }]);

    return SelectComponent;
}(React.Component);

function invCapInput(length) {
    var lengthArray = Array.from({ length: length }, function (v, i) {
        return v = 0;
    });
    return lengthArray.map(function (x, idx) {
        return React.createElement(InputComponent, { key: idx, id: 'inv' + (idx + 1), label: 'inv' + (idx + 1), name: 'invInputArray', noValue: true, value: Number(x.value), type: 'number' });
    });
}

var App = function (_React$Component3) {
    _inherits(App, _React$Component3);

    function App(props) {
        _classCallCheck(this, App);

        var _this5 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this5.getValue = function (value, id) {
            _this5.setState(_defineProperty({}, id, value));
        };

        _this5.state = {
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
        return _this5;
    }

    _createClass(App, [{
        key: 'getAllData',
        value: function getAllData() {
            var dataObj = this.state;
            var invInput = document.getElementsByName('invInputArray');
            var invArray = [];
            for (var i = 0; i < invInput.length; i++) {
                invArray.push(Number(invInput[i].value));
            }
            dataObj.invInput = invArray;
            console.log(dataObj);
            this.setState({
                JQtext: calculate(e, dataObj)
            });
            console.log(this.state.JQtext);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    null,
                    React.createElement(InputComponent, { id: 'factoryName', label: '\u6848\u5834\u540D\u7A31', type: 'text', factoryName: this.getValue }),
                    React.createElement(InputComponent, { id: 'factoryNumber', label: '\u6848\u5834\u7DE8\u865F', type: 'text', factoryNumber: this.getValue }),
                    React.createElement(InputComponent, { id: 'maxPvLength', label: '\u55AE\u53F0INV\u6700\u5927MPPT/PV\u6578\u91CF', type: 'number', maxPvLength: this.getValue }),
                    React.createElement(InputComponent, { id: 'irrLength', label: '\u65E5\u7167\u8A08\u6578\u91CF:(\u82E5\u7121\u5247\u586B0)', type: 'number', irrLength: this.getValue }),
                    React.createElement(SelectComponent, { id: 'HVMeter', label: '\u662F\u5426\u6709\u9AD8\u58D3\u76E4', option: radioArray, HVMeter: this.getValue }),
                    React.createElement(SelectComponent, { id: 'LVMeter', label: '\u662F\u5426\u6709\u4F4E\u58D3\u76E4', option: radioArray, LVMeter: this.getValue }),
                    React.createElement(SelectComponent, { id: 'Anemometer', label: '\u662F\u5426\u6709\u98A8\u901F\u8A08', option: radioArray, Anemometer: this.getValue }),
                    React.createElement(SelectComponent, { id: 'Waterlevel', label: '\u662F\u5426\u6709\u6C34\u4F4D\u8A08', option: radioArray, Waterlevel: this.getValue }),
                    React.createElement(SelectComponent, { id: 'ENVtemp', label: '\u662F\u5426\u6709\u74B0\u6EAB\u9336\u982D', option: radioArray, ENVtemp: this.getValue }),
                    React.createElement(SelectComponent, { id: 'PVtemp', label: '\u662F\u5426\u6709\u6A21\u7D44\u6EAB\u5EA6\u9336\u982D', option: radioArray, PVtemp: this.getValue }),
                    React.createElement(SelectComponent, { id: 'INVevent', label: 'INV\u578B\u865F', option: optionArray, INVevent: this.getValue }),
                    React.createElement(InputComponent, { id: 'invLength', label: 'INV\u6578\u91CF', type: 'number', invLength: this.getValue })
                ),
                React.createElement(
                    'div',
                    null,
                    invCapInput(this.state.invLength)
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'button',
                        { onClick: function onClick() {
                                return _this6.getAllData();
                            } },
                        'get all data'
                    )
                ),
                React.createElement(
                    'pre',
                    null,
                    this.state.JQtext
                )
            );
        }
    }]);

    return App;
}(React.Component);

var textInputContainer = document.querySelector('#textInput');
ReactDOM.render(React.createElement(App, null), textInputContainer);

function calculate(event, data) {
    // message_box.stop();
    // 定義函數內部可被使用的變數。

    console.log(data);
    // 假使被輸入了無法順利轉換成為數值的字串內容的話，內建函數 Number  就會傳回「並不是一個數值 (NaN, not a number)」...。
    var AllCapacity, INVNumber, MPPTNumber, LocateName, LocateID, IRRNumber, INVevent, HVMeter, LVMeter, PV_P, POWER_S, POWER_R, POWER_T, EFF;
    var Waterlevel, Anemometer, ENVtemp, PVtemp;
    LocateName = data.factoryName;
    LocateID = data.factoryNumber;
    INVNumber = data.invLength;
    MPPTNumber = data.maxPvLength;
    IRRNumber = data.irrLength;
    INVevent = data.INVevent;
    HVMeter = data.HVMeter;
    LVMeter = data.LVMeter;
    Anemometer = data.Anemometer;
    Waterlevel = data.Waterlevel;
    ENVtemp = data.ENVtemp;
    PVtemp = data.PVtemp;
    AllCapacity = data.invArray;
    PV_P = 'GenerateByIndex("inv_"; .inverterIndexes; "pv_p"; .PVIndexes; .data)';
    POWER_R = 'GenerateA("inv_"; .inverterIndexes; "power_r"; .data)';
    POWER_S = 'GenerateA("inv_"; .inverterIndexes; "power_s"; .data)';
    POWER_T = 'GenerateA("inv_"; .inverterIndexes; "power_t"; .data)';
    EFF = 'GenerateA("inv_"; .inverterIndexes; "Eff"; .data)';
    switch (INVevent) {
        case "HUAWEISUN2000EventIndexes":
            PV_P = 'GenerateCalculateABCrossorByIndexanddivide1000("inv_"; .inverterIndexes; "pv_a"; "pv_v"; .PVIndexes; .data)';
            POWER_R = 'GenerateABDivisor("inv_"; .inverterIndexes; "Vrs"; "Rc"; 1.73; .data)';
            POWER_S = 'GenerateABDivisor("inv_"; .inverterIndexes; "Vst"; "Sc"; 1.73; .data)';
            POWER_T = 'GenerateABDivisor("inv_"; .inverterIndexes; "Vrt"; "Tc"; 1.73; .data)';
            break;
        case "SolarEventIndexes":
            EFF = 'GenerateADivideB("inv_"; .inverterIndexes; "acp"; "dcp"; .data)';
            break;
    }

    var IRRValue = '';
    var IRRErrorMessage = '';
    if (IRRNumber == 0) {
        IRRErrorMessage = '';
        IRRValue = '[null]';
    } else {
        IRRErrorMessage = 'IRR: GenerateINVStatus("IRR_"; .iRRIndexes; .data),';
        IRRValue = 'GenerateA("IRR_"; .iRRIndexes; "IRR"; .data)';
    }
    var PVtempValue = '';
    var PVtempErrorMessage = '';
    if (PVtemp == 1) {
        PVtempValue = 'Generate("PV_TEMP"; "temp"; .data)';
        PVtempErrorMessage = 'PVTemp: GenerateStatus("PV_TEMP";.data),';
    } else {
        PVtempValue = 'null';
    }
    var ENVtempValue = '';
    var ENVtempErrorMessage = '';
    if (ENVtemp == 1) {
        ENVtempValue = 'Generate("ENV_TEMP"; "temp"; .data)';
        ENVtempErrorMessage = 'ENVtemp: GenerateStatus("ENV_TEMP";.data),';
    } else {
        ENVtempValue = 'null';
    }
    var WaterlevelMessage = '';
    var WaterlevelErrormessage = '';
    if (Waterlevel == 1) {
        WaterlevelMessage = 'Waterlevel: Generate("Waterlevel"; "Measurement_output_value"; .data),';
        WaterlevelErrormessage = 'Waterlevel: GenerateStatus("Waterlevel";.data),';
    }
    var AnemometerMessage = '';
    var AnemometerErrormessage = '';
    if (Anemometer == 1) {
        AnemometerMessage = 'Anemometer: Generate("Anemometer"; "Wind_speed"; .data),';
        AnemometerErrormessage = 'Anemometer: GenerateStatus("Anemometer";.data),';
    }
    var Errormessage = '';
    var etc = '';
    if (HVMeter == 1 && LVMeter == 1) {
        Errormessage = '\n    HV_Meter: GenerateStatus("HV_meter";.data),\n    LV_Meter: GenerateStatus("LV_meter";.data),';
        etc = 'etc:\n        {\n            "HV-meter": {\n                Vln_a: Generate("HV_meter"; "Vln_a"; .data),\n                Vln_b: Generate("HV_meter"; "Vln_b"; .data),\n                Vln_c: Generate("HV_meter"; "Vln_c"; .data),\n                Vll_ab: Generate("HV_meter"; "Vll_ab"; .data),\n                Vll_bc: Generate("HV_meter"; "Vll_bc"; .data),\n                Vll_ca: Generate("HV_meter"; "Vll_ca"; .data),\n                I_a: Generate("HV_meter"; "I_a"; .data),\n                I_b: Generate("HV_meter"; "I_b"; .data),\n                I_c: Generate("HV_meter"; "I_c"; .data),\n                Freq: Generate("HV_meter"; "freq"; .data),\n                P: Generate("HV_meter"; "P"; .data),\n                KVAR_tot: Generate("HV_meter"; "Q"; .data),\n                KVA_tot: Generate("HV_meter"; "S"; .data)\n            },\n            "LV-meter": {\n                Vln_a: Generate("LV_meter"; "Vln_a"; .data),\n                Vln_b: Generate("LV_meter"; "Vln_b"; .data),\n                Vln_c: Generate("LV_meter"; "Vln_c"; .data),\n                Vll_ab: Generate("LV_meter"; "Vll_ab"; .data),\n                Vll_bc: Generate("LV_meter"; "Vll_bc"; .data),\n                Vll_ca: Generate("LV_meter"; "Vll_ca"; .data),\n                I_a: Generate("LV_meter"; "I_a"; .data),\n                I_b: Generate("LV_meter"; "I_b"; .data),\n                I_c: Generate("LV_meter"; "I_c"; .data),\n                Freq: Generate("LV_meter"; "freq"; .data),\n                P: Generate("LV_meter"; "P"; .data),\n                KVAR_tot: Generate("LV_meter"; "Q"; .data),\n                KVA_tot: Generate("LV_meter"; "S"; .data)\n            }\n            \n        },';
    } else if (HVMeter == 1 && LVMeter == 0) {
        Errormessage = 'HV_Meter: GenerateStatus("HV_meter";.data),';
        etc = 'etc:\n        {\n            "HV-meter": {\n                Vln_a: Generate("HV_meter"; "Vln_a"; .data),\n                Vln_b: Generate("HV_meter"; "Vln_b"; .data),\n                Vln_c: Generate("HV_meter"; "Vln_c"; .data),\n                Vll_ab: Generate("HV_meter"; "Vll_ab"; .data),\n                Vll_bc: Generate("HV_meter"; "Vll_bc"; .data),\n                Vll_ca: Generate("HV_meter"; "Vll_ca"; .data),\n                I_a: Generate("HV_meter"; "I_a"; .data),\n                I_b: Generate("HV_meter"; "I_b"; .data),\n                I_c: Generate("HV_meter"; "I_c"; .data),\n                Freq: Generate("HV_meter"; "freq"; .data),\n                P: Generate("HV_meter"; "P"; .data),\n                KVAR_tot: Generate("HV_meter"; "Q"; .data),\n                KVA_tot: Generate("HV_meter"; "S"; .data)\n            }\n        },';
    } else if (HVMeter == 0 && LVMeter == 1) {
        Errormessage = 'LV_Meter: GenerateStatus("LV_meter";.data),';
        etc = 'etc:\n        {\n            "LV-meter": {\n                Vln_a: Generate("LV_meter"; "Vln_a"; .data),\n                Vln_b: Generate("LV_meter"; "Vln_b"; .data),\n                Vln_c: Generate("LV_meter"; "Vln_c"; .data),\n                Vll_ab: Generate("LV_meter"; "Vll_ab"; .data),\n                Vll_bc: Generate("LV_meter"; "Vll_bc"; .data),\n                Vll_ca: Generate("LV_meter"; "Vll_ca"; .data),\n                I_a: Generate("LV_meter"; "I_a"; .data),\n                I_b: Generate("LV_meter"; "I_b"; .data),\n                I_c: Generate("LV_meter"; "I_c"; .data),\n                Freq: Generate("LV_meter"; "freq"; .data),\n                P: Generate("LV_meter"; "P"; .data),\n                KVAR_tot: Generate("LV_meter"; "Q"; .data),\n                KVA_tot: Generate("LV_meter"; "S"; .data)\n            }\n        },';
    } else if (HVMeter == 0 && LVMeter == 0) {
        Errormessage = '';
        etc = '';
    }
    console.log(Errormessage);
    console.log(INVevent);
    var INVARR = [];
    for (var i = 1; i <= INVNumber; i++) {
        if (i < 10) {
            INVARR.push('"0' + i + '"');
        } else {
            INVARR.push('"' + i + '"');
        }
    }
    var MPPTARR = [];
    for (var _i = 1; _i <= MPPTNumber; _i++) {
        MPPTARR.push('"' + _i + '"');
    }
    var IRRARR = [];
    for (var _i2 = 1; _i2 <= IRRNumber; _i2++) {
        if (_i2 < 10) {
            IRRARR.push('"0' + _i2 + '"');
        } else {
            IRRARR.push('"' + _i2 + '"');
        }
    }
    var EVENTARR = [];
    for (var _i3 = 1; _i3 <= INVNumber; _i3++) {
        if (_i3 < 10) {
            EVENTARR.push('EventOneArray("inv_0' + _i3 + '"; .' + INVevent + '; .data)');
        } else {
            EVENTARR.push('EventOneArray("inv_' + _i3 + '"; .' + INVevent + '; .data)');
        }
    }

    var checkarr = [LocateName, LocateID, INVNumber, MPPTNumber];
    var check = checkarr.every(function (x) {
        return x !== '' && x !== 0;
    });
    if (!check) return;

    return 'def FormatFloat: . * 100 | floor | . / 100;\ndef GenerateCapacity($source_indexes):\nmap(   \n$source_indexes\n)\n;\ndef GenerateINVStatus($source_prefix; $source_indexes; $data):\n$source_indexes | map(\nif $data."\\($source_prefix+(.|tostring))".status !=0 then "\u8A2D\u5099\u65B7\u8A0A" else 0 end\n)\n;\ndef GenerateStatus($source_prefix; $data):\n(\nif $data."\\($source_prefix)".status !=0 then "\u8A2D\u5099\u65B7\u8A0A" else 0 end\n)\n;\ndef EventOneArray($source_prefix; $event_indexes; $data):\n$event_indexes | map(\nif $data."\\($source_prefix)".status == 0 then $data."\\($source_prefix)"."\\((.|tostring))" else -1 end\n)\n;\ndef GenerateEvent($source_prefix; $source_indexes; $a; $data):\n$source_indexes | map(\nif $data."\\($source_prefix+(.|tostring))".status == 0 then\n    $data."\\($source_prefix+(.|tostring))"."\\($a)" | FormatFloat\nelse 0 end\n)\n;\ndef Generate($source; $tag_prefix; $data):\n(\nif $data."\\($source)".status == 0 then\n(\nif ($data."\\($source)"."\\($tag_prefix)" ) != null\nthen\n($data."\\($source)"."\\($tag_prefix)") | FormatFloat\nelse\n($data."\\($source)"."\\($tag_prefix)")\nend\n)\nelse 0 end\n)\n;\ndef GenerateConstSourceByIndex($source; $tag_prefix; $tag_indexes; $data):\n(\n(\n$tag_indexes | map(\n    if $data."\\($source)".status == 0 then (\n        if\n        ($data."\\($source)"."\\($tag_prefix+(.|tostring))") != null\n        then\n        $data."\\($source)"."\\($tag_prefix+(.|tostring))"| FormatFloat\n        else ($data."\\($source)"."\\($tag_prefix+(.|tostring))")\n        end )\n    else 0 end\n)\n)\n)\n;\ndef GenerateByIndex($source_prefix; $source_indexes; $tag_prefix; $tag_indexes; $data):\n$source_indexes | map(\nGenerateConstSourceByIndex($source_prefix+(.|tostring); $tag_prefix; $tag_indexes; $data)\n)\n;\ndef GenerateA($source_prefix; $source_indexes; $a; $data):\n$source_indexes | map(\nif $data."\\($source_prefix+(.|tostring))".status == 0 then(\n    if ($data."\\($source_prefix+(.|tostring))"."\\($a)" ) > 0 \n    then\n    $data."\\($source_prefix+(.|tostring))"."\\($a)" | FormatFloat\n    else 0 end )\nelse 0 end\n)\n;\ndef GenerateABDivisor($source_prefix; $source_indexes; $a; $b; $divisor; $data):\n$source_indexes | map(\nif $data."\\($source_prefix+(.|tostring))".status == 0 then\n(\n    if (( $data."\\($source_prefix+(.|tostring))"."\\($a)" ) != 0 and ( $data."\\($source_prefix+(.|tostring))"."\\($b)") != 0)\n    then\n    $data."\\($source_prefix+(.|tostring))"."\\($a)" * $data."\\($source_prefix+(.|tostring))"."\\($b)" / $divisor | FormatFloat\n    else 0 end\n)\nelse 0 end\n)\n;\ndef GenerateACrossor($source_prefix; $source_indexes; $a; $crossor; $data):\n$source_indexes | map(\nif $data."\\($source_prefix+(.|tostring))".status == 0 then\n    $data."\\($source_prefix+(.|tostring))"."\\($a)" * $crossor | FormatFloat\nelse 0 end\n)\n;\ndef GeneratetempSourceByIndex($source; $tag_prefix; $tag_indexes; $data):\n$tag_indexes | map(\nif $data."\\($source)".status == 0 then\n    $data."\\($source)"."\\($tag_prefix)" | FormatFloat\nelse 0 end\n)\n;\ndef GenerateOnlyOneTempIndex($source_prefix; $source_indexes; $tag_prefix; $tag_indexes; $data):\n$source_indexes | map(\nGeneratetempSourceByIndex($source_prefix+(.|tostring); $tag_prefix; $tag_indexes; $data)\n)\n;\ndef GenerateABCrossor($source; $tag_prefix_a; $tag_prefix_b; $tag_indexes; $data):\n(\n(\n$tag_indexes | map(\n    if $data."\\($source)".status == 0 then (\n        if\n        ($data."\\($source)"."\\($tag_prefix_a+(.|tostring))") != null \n        then\n        $data."\\($source)"."\\($tag_prefix_a+(.|tostring))" * $data."\\($source)"."\\($tag_prefix_b+(.|tostring))"| FormatFloat\n        else "-1" end )\n    else 0 end\n)\n) | map(select(. != "-1"))\n)\n;\ndef GenerateCalculateABCrossorByIndex($source_prefix; $source_indexes; $tag_a; $tag_b; $tag_indexes; $data):\n$source_indexes | map(\nGenerateABCrossor($source_prefix+(.|tostring); $tag_a; $tag_b; $tag_indexes; $data)\n)\n;\ndef GenerateABCrossoranddivide1000($source; $tag_prefix_a; $tag_prefix_b; $tag_indexes; $data):\n(\n(\n$tag_indexes | map(\n    if $data."\\($source)".status == 0 then (\n        if\n        ($data."\\($source)"."\\($tag_prefix_a+(.|tostring))") and ($data."\\($source)"."\\($tag_prefix_b+(.|tostring))") != null \n        then\n        $data."\\($source)"."\\($tag_prefix_a+(.|tostring))" * $data."\\($source)"."\\($tag_prefix_b+(.|tostring))" / 1000 | FormatFloat\n        else \n        ($data."\\($source)"."\\($tag_prefix_a+(.|tostring))")\n        end )\n    else 0 end\n)\n) \n)\n;\ndef GenerateCalculateABCrossorByIndexanddivide1000($source_prefix; $source_indexes; $tag_a; $tag_b; $tag_indexes; $data):\n$source_indexes | map(\nGenerateABCrossoranddivide1000($source_prefix+(.|tostring); $tag_a; $tag_b; $tag_indexes; $data)\n)\n;\ndef GenerateADivideB($source_prefix; $source_indexes; $a; $b; $data):\n$source_indexes | map(\nif $data."\\($source_prefix+(.|tostring))".status == 0 then\n(\n    if (( $data."\\($source_prefix+(.|tostring))"."\\($a)" ) != 0 and ( $data."\\($source_prefix+(.|tostring))"."\\($b)") != 0)\n    then\n    $data."\\($source_prefix+(.|tostring))"."\\($a)" / $data."\\($source_prefix+(.|tostring))"."\\($b)" | FormatFloat\n    else 0 end\n)\nelse 0 end\n)\n;\n{\ninverterIndexes: [' + INVARR + '],\nPVIndexes: [' + MPPTARR + '],\niRRIndexes: [' + IRRARR + '],\ninvTempIndexes: [1],\ncapacityIndexes:[' + AllCapacity + '],\nDeltaEventIndexes:["alarm_E1","alarm_E2","alarm_E3","alarm_W1","alarm_W2","alarm_F1","alarm_F2","alarm_F3","alarm_F4","alarm_F5"],\nSolarEventIndexes:["event_Gb","event_M1","event_M2","event_M3"],\nHUAWEISUN2000EventIndexes:["event_1","event_2","event_3"],\ndata: .\n} |\n{\nfactoryName: "' + LocateName + '",\ntimestamp: (now+28800|strftime("%Y-%m-%dT%H:%M:%SZ")),\ndetail:\n{\nfactoryId: "' + LocateID + '",\nfactoryName: "' + LocateName + '",\npv_v: GenerateByIndex("inv_"; .inverterIndexes; "pv_v"; .PVIndexes; .data),\npv_a: GenerateByIndex("inv_"; .inverterIndexes; "pv_a"; .PVIndexes; .data),\npv_p: ' + PV_P + ',\nPF: GenerateA("inv_"; .inverterIndexes; "PF"; .data),\nVrn: GenerateA("inv_"; .inverterIndexes; "Vrs"; .data),\nVsn: GenerateA("inv_"; .inverterIndexes; "Vst"; .data),\nVtn: GenerateA("inv_"; .inverterIndexes; "Vrt"; .data),\nRc: GenerateA("inv_"; .inverterIndexes; "Rc"; .data),\nSc: GenerateA("inv_"; .inverterIndexes; "Sc"; .data),\nTc: GenerateA("inv_"; .inverterIndexes; "Tc"; .data),\nEff: ' + EFF + ',\ntemp: GenerateOnlyOneTempIndex("inv_"; .inverterIndexes; "temp"; .invTempIndexes; .data),\nState: GenerateA("inv_"; .inverterIndexes; "State"; .data),\nacp: GenerateA("inv_"; .inverterIndexes; "acp"; .data),\ndcp: GenerateA("inv_"; .inverterIndexes; "dcp"; .data),\nE_today: GenerateA("inv_"; .inverterIndexes; "E_today"; .data),\nAC_kWh: GenerateA("inv_"; .inverterIndexes; "AC_kwh"; .data),\nfreq: GenerateA("inv_"; .inverterIndexes; "freq"; .data),\nevent: [\n    ' + EVENTARR + '\n  ],\npower_r: ' + POWER_R + ',\npower_s: ' + POWER_S + ',\npower_t: ' + POWER_T + ',\ncapacity: (.capacityIndexes),\nIRR: ' + IRRValue + ',\nPVTemp: ' + PVtempValue + ',\nENVTemp: ' + ENVtempValue + ',\n' + WaterlevelMessage + '\n' + AnemometerMessage + '\nErrorMessage:\n    {\n    inv: GenerateINVStatus("inv_"; .inverterIndexes; .data),\n    ' + IRRErrorMessage + '\n    ' + PVtempErrorMessage + '\n    ' + ENVtempErrorMessage + '\n    ' + Errormessage + '\n    ' + WaterlevelErrormessage + '\n    ' + AnemometerErrormessage + '\n    },\n' + etc + '\nSYSTIME: (now | floor | tostring)\n}\n}';
}