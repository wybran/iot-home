import OneSignal from 'react-onesignal';
import moment from "moment";
import "moment/locale/pl";
moment.locale("pl");

export const timestampToHour = (timestamp: string): String => {
    const date = new Date(timestamp);
    const timeString = date.toLocaleString("pl-PL", {
        hour: "numeric",
        minute: "numeric",
        hour12: false
    });
    return timeString.split(":")[0] + ":00";
};

export const timestampToMoment = (timestamp: string): String => {
    return moment(timestamp).fromNow();
};

export default async function runOneSignal() {
    await OneSignal.init({
        appId: "066534bd-877a-40c7-9d64-25cecade4dee",
        allowLocalhostAsSecureOrigin: true
    });
    OneSignal.showSlidedownPrompt();
}
