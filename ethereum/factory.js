import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x2bD161b17e82088CdA6435389C7643AC4b385ADb'
    );

export default instance;