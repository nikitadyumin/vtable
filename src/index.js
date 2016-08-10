import {view, model} from './vtable';
import Rx from 'rxjs';
import rstore from 'rstore';
import h from 'snabbdom/h';

const data = {


    "data": [{
        "_id": "57a990019eb1f040712ba81e",
        "ID": "100073000",
        "InternalCustomerID": "COM PR",
        "CtrlNum3": "",
        "CtrlNum2": "",
        "CtrlNum1": "",
        "DocumentDate": "2016-07-24T08:40:00.352Z",
        "Document": "xml",
        "Reference": "",
        "Receiver": "48599448",
        "Sender": "A163",
        "Type": "ERROR_REPORT",
        "Status": "IMPORT",
        "EventStatus": "Error",
        "createdAt": "2016-05-20T11:04:42.539Z",
        "Events": [{
            "Log": "",
            "EventStatus": "Success",
            "EventDate": "2016-07-24T08:40:00.372Z",
            "Event": "RECEIVED",
            "Sequence": "103925"
        }, {
            "Log": "The setup X12 for partner reference BRUA is not known in the system.",
            "EventStatus": "Error",
            "EventDate": "2016-07-24T08:40:00.429Z",
            "Event": "IMPORT",
            "Sequence": "103931"
        }, {
            "Log": "The setup X12 for partner reference BRUA is not known in the system.",
            "EventStatus": "Error",
            "EventDate": "2016-07-24T08:40:00.429Z",
            "Event": "IMPORT",
            "Sequence": "103931"
        }],
        "RelatedDocs": []
    }, {
        "_id": "576420afe49c18d94c1d96dc",
        "Status": "SEND",
        "Type": "IFTMIN",
        "Sender": "48599448",
        "Receiver": "FXNL",
        "Reference": "5021516011",
        "Document": "SHIP",
        "DocumentDate": "2016-06-17T18:08:59.313Z",
        "CtrlNum1": "",
        "CtrlNum2": "",
        "CtrlNum3": "",
        "InternalCustomerID": "TMS PR",
        "ID": "10016944",
        "EventStatus": "Success",
        "createdAt": "2016-06-17T16:09:19.361Z",
        "Events": [{
            "Sequence": "10364116",
            "Event": "SEND",
            "EventDate": "2016-06-17T18:09:01.209Z",
            "EventStatus": "Success",
            "Log": ""
        }],
        "RelatedDocs": []
    }, {
        "_id": "576420afe49c18d94c1d96dd",
        "Status": "SEND",
        "Type": "IFTMIN",
        "Sender": "48599448",
        "Receiver": "FLSJ",
        "Reference": "400222387",
        "Document": "SHIP",
        "DocumentDate": "2016-06-17T18:08:59.641Z",
        "CtrlNum1": "",
        "CtrlNum2": "",
        "CtrlNum3": "",
        "InternalCustomerID": "TMS PR",
        "ID": "10016948",
        "EventStatus": "Success",
        "createdAt": "2016-06-17T16:09:19.363Z",
        "Events": [{
            "Sequence": "10364122",
            "Event": "SEND",
            "EventDate": "2016-06-17T18:09:01.407Z",
            "EventStatus": "Success",
            "Log": ""
        }],
        "RelatedDocs": []
    }, {
        "_id": "576420af3d44e6c54c838a9c",
        "Status": "SEND",
        "Type": "IFTMIN",
        "Sender": "48599448",
        "Receiver": "5JBD",
        "Reference": "T01699477",
        "Document": "SHIP",
        "DocumentDate": "2016-06-17T18:08:59.471Z",
        "CtrlNum1": "",
        "CtrlNum2": "",
        "CtrlNum3": "",
        "InternalCustomerID": "TMS PR",
        "ID": "10016947",
        "EventStatus": "Success",
        "createdAt": "2016-06-17T16:09:19.361Z",
        "Events": [{
            "Sequence": "10364121",
            "Event": "SEND",
            "EventDate": "2016-06-17T18:09:01.360Z",
            "EventStatus": "Success",
            "Log": ""
        }],
        "RelatedDocs": []
    }, {
        "_id": "577636fb0898c9ad2195b3e6",
        "Status": "SEND",
        "Type": "IFTMIN",
        "Sender": "48599448",
        "Receiver": "6091417",
        "Reference": "0011891017",
        "Document": "SHIP",
        "DocumentDate": "2016-07-01T11:25:14.755Z",
        "CtrlNum1": "",
        "CtrlNum2": "",
        "CtrlNum3": "",
        "InternalCustomerID": "TMS PR",
        "ID": "10017230",
        "EventStatus": "Success",
        "createdAt": "2016-07-01T09:25:15.098Z",
        "Events": [{
            "Sequence": "10365022",
            "Event": "SEND",
            "EventDate": "2016-07-01T11:25:15.103Z",
            "EventStatus": "Success",
            "Log": ""
        }],
        "RelatedDocs": []
    }, {
        "_id": "5776360a0898c9ad2195b3e5",
        "Status": "SEND",
        "Type": "IFTMIN",
        "Sender": "48599448",
        "Receiver": "6091417",
        "Reference": "0011891017",
        "Document": "SHIP",
        "DocumentDate": "2016-07-01T11:21:14.258Z",
        "CtrlNum1": "",
        "CtrlNum2": "",
        "CtrlNum3": "",
        "InternalCustomerID": "TMS PR",
        "ID": "10017224",
        "EventStatus": "Success",
        "createdAt": "2016-07-01T09:21:14.320Z",
        "Events": [{
            "Sequence": "10365016",
            "Event": "SEND",
            "EventDate": "2016-07-01T11:21:14.332Z",
            "EventStatus": "Success",
            "Log": ""
        }],
        "RelatedDocs": []
    }, {
        "_id": "577635a60898c9ad2195b3e4",
        "Status": "SEND",
        "Type": "IFTMIN",
        "Sender": "48599448",
        "Receiver": "6091417",
        "Reference": "0011891017",
        "Document": "SHIP",
        "DocumentDate": "2016-07-01T11:19:34.383Z",
        "CtrlNum1": "",
        "CtrlNum2": "",
        "CtrlNum3": "",
        "InternalCustomerID": "TMS PR",
        "ID": "10017218",
        "EventStatus": "Success",
        "createdAt": "2016-07-01T09:19:34.917Z",
        "Events": [{
            "Sequence": "10365010",
            "Event": "SEND",
            "EventDate": "2016-07-01T11:19:34.928Z",
            "EventStatus": "Success",
            "Log": ""
        }],
        "RelatedDocs": []
    }, {
        "_id": "5776352e0898c9ad2195b3e3",
        "Status": "SEND",
        "Type": "IFTMIN",
        "Sender": "48599448",
        "Receiver": "6091417",
        "Reference": "0011891017",
        "Document": "SHIP",
        "DocumentDate": "2016-07-01T11:17:34.382Z",
        "CtrlNum1": "",
        "CtrlNum2": "",
        "CtrlNum3": "",
        "InternalCustomerID": "TMS PR",
        "ID": "10017215",
        "EventStatus": "Success",
        "createdAt": "2016-07-01T09:17:34.597Z",
        "Events": [{
            "Sequence": "10365007",
            "Event": "SEND",
            "EventDate": "2016-07-01T11:17:34.607Z",
            "EventStatus": "Success",
            "Log": ""
        }],
        "RelatedDocs": []
    }, {
        "_id": "577634eb0898c9ad2195b3e2",
        "Status": "SEND",
        "Type": "IFTMIN",
        "Sender": "48599448",
        "Receiver": "6091417",
        "Reference": "0011891017",
        "Document": "SHIP",
        "DocumentDate": "2016-07-01T11:16:25.782Z",
        "CtrlNum1": "",
        "CtrlNum2": "",
        "CtrlNum3": "",
        "InternalCustomerID": "TMS PR",
        "ID": "10017212",
        "EventStatus": "Success",
        "createdAt": "2016-07-01T09:16:27.047Z",
        "Events": [{
            "Sequence": "10365004",
            "Event": "SEND",
            "EventDate": "2016-07-01T11:16:27.046Z",
            "EventStatus": "Success",
            "Log": ""
        }],
        "RelatedDocs": []
    }, {
        "_id": "577625a20898c9ad2195b3e1",
        "Status": "SEND",
        "Type": "IFTMIN",
        "Sender": "48599448",
        "Receiver": "6091417",
        "Reference": "0011891017",
        "Document": "SHIP",
        "DocumentDate": "2016-07-01T10:11:13.904Z",
        "CtrlNum1": "",
        "CtrlNum2": "",
        "CtrlNum3": "",
        "InternalCustomerID": "TMS PR",
        "ID": "10017185",
        "EventStatus": "Success",
        "createdAt": "2016-07-01T08:11:14.595Z",
        "Events": [{
            "Sequence": "10364907",
            "Event": "SEND",
            "EventDate": "2016-07-01T10:11:14.607Z",
            "EventStatus": "Success",
            "Log": ""
        }],
        "RelatedDocs": []
    }]


    , "count": 180

};

const dateRenderer = value => h('td', new Date(value).getTime());

const data$ = Rx.Observable.of(data);
const meta = ({
    columns: [
        {
            visible: false,
            name: 'id',
            id: '_id'
        },
        {
            visible: true,
            name: 'Type',
            id: 'Type'
        },
        {
            visible: true,
            name: 'Sender',
            id: 'Sender'
        },
        {
            visible: true,
            name: 'Receiver',
            id: 'Receiver'
        },
        {
            visible: true,
            renderer: dateRenderer,
            name: 'DocumentDate',
            id: 'DocumentDate'
        }
    ]
});

function shuffle(arr) {
    const res = arr.slice(0);
    const length = res.length;
    for (let i = 0; i < length; i++) {
        const t = res[i];
        const randomPos = Math.floor(Math.random() * (length - i)) + i;
        res[i] = res[randomPos];
        res[randomPos] = t;
    }
    return res.map(c => {
        c.visible = Math.random() > 0.25;
        return c;
    });
}

const meta$ = Rx.Observable.interval(500).map(() => {
    return {columns : shuffle(meta.columns)};
});

const $container = document.getElementById('table');
view($container, model(meta$, data$));



