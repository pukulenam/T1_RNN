'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', async () => {
  return { status: 'Success Deploy' };
});

Route.group(() => {
  Route.get("newstribun", "News/TribunController.getNewsDetail");
  Route.get("newscnn", "News/CNNIndonesiaController.getNewsDetail");
  Route.get("newsbbc", "News/BBCWorldController.getNewsDetail");
  Route.get("newscbn", "News/CBNWorldController.getNewsDetail");
  Route.get("newscnbc", "News/CNBCWorldController.getNewsDetail");
  Route.get("newswebmd", "News/WebMDController.getNewsDetail");
  Route.get("newsmoneytalks", "News/MoneyTalksController.getNewsDetail");
  Route.get("newsngpf", "News/NGPFController.getNewsDetail");
  Route.get("newstci", "News/TheCollegeInvestorController.getNewsDetail");
  Route.get("newsgrs", "News/GetRichSlowlyController.getNewsDetail");
  Route.get("newsmm", "News/MillennialMoneyController.getNewsDetail");
  Route.get("newskumparan", "News/KumparanController.getNewsDetail");
  Route.get("newsnvidia", "News/NvidiaController.getNewsDetail");
  Route.get("newsmit", "News/MITController.getNewsDetail");
  Route.get("newsau", "News/AndroidAuthorityController.getNewsDetail");
  Route.get("newsgizchina", "News/GizchinaController.getNewsDetail");
  Route.get("newsgizmochina", "News/GizmochinaController.getNewsDetail");
  Route.get("newsgsm", "News/GSMArenaController.getNewsDetail");
  Route.get("newsgenshin", "News/GenshinController.getNewsDetail");
  Route.get("newsthespike", "News/TheSpikeController.getNewsDetail");
  Route.get("newsnintendo", "News/NintendoController.getNewsDetail");
  Route.get("newsxbox", "News/XboxController.getNewsDetail");
  Route.get("newsps", "News/PlaystationController.getNewsDetail");
  Route.get("newsukhsa", "News/PHMattersController.getNewsDetail");
  Route.get("newscredi", "News/CredihealthController.getNewsDetail");
  Route.get("newshealthpartners", "News/HealthPartnersController.getNewsDetail");
  Route.get("newstime", "News/TimeController.getNewsDetail");
  Route.get("newshealthians", "News/HealthiansController.getNewsDetail");
}).prefix("v1/scraper");
