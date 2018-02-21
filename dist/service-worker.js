/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["404-desktop.html","73dad0990076459b768e10d94cfe2dc5"],["404-mobile.html","01b50daf4bedecd905bcfa6a00b6e2f5"],["checkout.html","674a8d8618dabdecb81db2bf3bbbaf35"],["checkoutDesktop.html","4ffa0db3a5031ed604990357e6634056"],["confirm.html","4ece19f5284ef978e91c5e26906a7aa3"],["confirmDesktop.html","6279f660eff962038982a72ddb197980"],["css/style.css","6a569e34ea2b7099d6ef7639bf9c1819"],["css/style.css.map","9fe93d7bb26d08c12b33fca7332735be"],["fonts/Dia-Black.woff","f3dbf3cdf6dede231fcb9567431709e9"],["fonts/Dia-Bold.woff","1d324d187a54dd6afa310456e4fef280"],["fonts/Dia-Light.woff","08063d0407140a31c41b9fbbe9fa9d54"],["fonts/Dia-Regular.woff","e3b981adbe4d34955252edf617d23f10"],["glpMen.html","f5fc5ef89989214e4ef7b06320231090"],["glpWomen.html","d1e7c9b39f6cf293aea55738fb2a2b97"],["homepage.html","9386e3803e2e1e650ffeccc4eb38f691"],["homepageB.html","659fa0e905edd7bae4b25261fe38bcb3"],["img/FooterMobile.png","bc088cd8cd626745f2c18f371c6dd287"],["img/cart/Paypal.png","1524d6731752966f5ecdb0e1debeadc3"],["img/cart/Visa.png","16a405a48d7c81ee522ac2f9691d6e51"],["img/checkout/arrowBack.svg","ee72578346e63c93a46c4680b09c452e"],["img/checkout/box.svg","56ae15acf098ae2bca14a165b92d05e3"],["img/checkout/cc.png","c28deac208b0f5b30108b896b3972b94"],["img/checkout/ccFade.png","cd197dafd51f72f9a9d57f330d7ecc4f"],["img/checkout/check.svg","ec838196fbdd1fe6448c31ec1bfe7258"],["img/checkout/icon.svg","71ed59c7fe20ae6ee29bc5de0a29da78"],["img/checkout/visa.png","fbc536326d4d05b178d99f19fd85fea8"],["img/confirm/giphy.gif","82613918e98c22c1737d0b5e42862aa8"],["img/confirm/giphy__.gif","3f1d9e8cf59302158a8a801844ea9323"],["img/confirm/giphy___.gif","3cfea2e163e23a59af291fcf1d497f4a"],["img/fourofour/fourofour_D.jpg","38a175fd62d25e4749a129e091715184"],["img/fourofour/fourofour_M.jpg","43cca099cc76d526dc3da5e8ef01c08c"],["img/global/bttBtn.png","c34013ef567d9dc02cab63224d541bc4"],["img/global/carret.svg","0bdfe4b419c25ada46f73f5877bf4ee8"],["img/global/desktopFooter.png","83f3e479ebb3a47f67937cc13959ca3c"],["img/global/emptyRow.jpg","76c38b63fbc35e59aa587b97e9b0ffbb"],["img/global/halfEmpty.jpg","873027c90263af789d05b2fcf588540e"],["img/global/halfTexture.jpg","d12a1d9a6e48f9fd87c8345aa50cba4f"],["img/global/helpBtn.png","7853e1c0e13eb50e4beb27119bcea339"],["img/global/ico_bagEmpty.svg","b34b27051d113f6909f215dd20d44af8"],["img/global/ico_brand.svg","a415d78e0f07f74866afb6cc2f77af49"],["img/global/ico_chevron.svg","95fa308ed9806ea3ef44d7ec4b2332ec"],["img/global/ico_search.svg","acaa611b365d27509f2911b4a0475b46"],["img/glp/glpM_lead.jpg","8c45892c8fc908beedfb895ce933a5ff"],["img/glp/glpM_socialA.jpg","e0f7275e28ae545b1f4a72f87c0a1bc9"],["img/glp/glpM_socialB.jpg","d5f74cafb1aa215709df010d6c3af33a"],["img/glp/glpM_socialC.jpg","c18fcbb87c7e6e133da917af9676a79b"],["img/glp/glpM_tileB.jpg","1d1a186fd995617906e417f666edc286"],["img/glp/glpM_tileC.jpg","b435b9d34a2d5f2043759ef47996d74e"],["img/glp/glpW_lead.jpg","f471a095fe940d8736b035c722ac2c39"],["img/glp/glpW_socialA.jpg","4b944e7f56d6288daecad5afe2df8ea9"],["img/glp/glpW_socialB.jpg","eebc096733e2fbdc6071f65812b29635"],["img/glp/glpW_socialC.jpg","69276614f533129e2ac80e93ee637a0b"],["img/glp/glpW_tile.jpg","e29e1c126191c9bdab82bc45020103fe"],["img/glp/glpW_tileB.jpg","338b85dc0bae04eac77cf40814d9e852"],["img/glp/glpW_tileC.jpg","932a6db6157162dbd655436a1ee5a7dc"],["img/glp/glp_tile.jpg","9f049d838ae73a0d0ee2d1796044ff3a"],["img/glp/mfeat_A.jpg","d1443bb0194a9bb0f9dd8b66c05ac223"],["img/glp/mfeat_B.jpg","4d9d6d096ea1c5c31aa29389c8ec0dc9"],["img/glp/mfeat_C.jpg","d622396e48d4a1e302e297f2bd9b9518"],["img/glp/wfeat_A.jpg","25b4336ffbcdd00f773339ea29f92b93"],["img/glp/wfeat_B.jpg","6b25dcee61cd93fddedf516b4489f2f2"],["img/glp/wfeat_C.jpg","469bf6d8b1112399991ef946c88ca40b"],["img/hp/chelseaTile.jpg","addc6a62387560fe4f81fec275d725b6"],["img/hp/hpB.jpg","7dfff272f0216aeb619cd88e6875ba52"],["img/hp/hp_bannerDesktop.png","8f6cb5d9af0c891331fa9fdd4d39a38e"],["img/hp/hp_sectionB.jpg","90996b44bee160572cf5c3acfe0a425e"],["img/hp/hp_socialA.jpg","8deb18b93ea7e2dbb09ed81405dedef6"],["img/hp/hp_socialB.jpg","64177efc0e1c7c247e471915782ba6da"],["img/hp/hp_socialC.jpg","0276150c71de3b02c262dae193f51b1a"],["img/hp/me2we.jpg","57ab12f18ea7d7517eeb11373a9d8dc9"],["img/hp/me2weTile.jpg","ce38d1f6fa86b8b7f3fba00dd582d59c"],["img/hp/top3_C.jpg","d96ebde09f586af8328f97dc9abf0324"],["img/me2we/Group 3.png","f8c186f96666f0dbaa8e61d6782713e9"],["img/me2we/cle_a.jpg","a7e8d23a3f0ff83548f5510fb9fb217d"],["img/me2we/cle_b.jpg","86b587c09add21f7fa825ad91a7f37c9"],["img/me2we/edu_a.jpg","3edf123c16072c2ce6f2a7adf12e76a7"],["img/me2we/edu_c.jpg","c52130698663c5ff48179cfc5cccabbb"],["img/me2we/ico_cle.png","d26409db2c4fbb5045640108d5965821"],["img/me2we/ico_edu.png","185f77d587a874fd5cc11d2123c3825a"],["img/me2we/ico_opp.png","ecb35d928a716f91693a2be32e1971ec"],["img/me2we/me2we_b.png","18b3596f1621850f9247becde50bbff8"],["img/me2we/me2we_d.png","f8c3f4c7686bed3f5bbbae9eef3ff2e4"],["img/me2we/me2we_e.png","b5a24aeeda898fc44c8f517442b6a196"],["img/me2we/me2welogo.png","c63c5970fc1d881cedb126bb9f87a946"],["img/me2we/opp_a.jpg","930774d769cecd7694848ecb6fdf4dbe"],["img/me2we/opp_b.jpg","9d3a7a9611e286fb16cf7b8599584802"],["img/me2we/pro_1.jpg","1fae1665d620742a15a2cc7ecbb4cd97"],["img/me2we/pro_2.jpg","c5425b4e1cc8fedc53ec45fd70bd8a2e"],["img/me2we/pro_3.jpg","f0bb63d13d328c1c8a3f894fe56ec164"],["img/nav/menNav_backgroundB.jpg","dce0b76d3784567b90ecf9e7e53d4cff"],["img/nav/menNav_backgroundC.jpg","b7af19af65c1126774347dc65a9e0d01"],["img/nav/menNav_panelA.jpg","47d75b3aaacbef9563bfc84bb19793ab"],["img/nav/sale_Left.jpg","ecf7db6cb501c05735a2c3668ceb9fea"],["img/nav/sale_Right.jpg","380c99f3ca48949c5ce0c2f8136853b6"],["img/nav/womenNav_backgroundB.jpg","aee44f57f8a3850fbe6625d84e4d279d"],["img/nav/womenNav_backgroundC.jpg","96002d875d35454516e742737f5204d6"],["img/nav/womenNav_panelA.jpg","9fb2f0c2a28b0684f9e50bcbe622217e"],["img/nav/women_nav_bottom.jpg","70cfdbf99cafe73c15b998590ae47d3b"],["img/nav/women_nav_top.jpg","1b14a380556040481b1645f31a8cd802"],["img/pdp/TrueFit.svg","74557e72811310ad82fc8499d7a2408c"],["img/pdp/USA.svg","64af2ed49ec9b3e399ecd8407579c3e6"],["img/pdp/allday.svg","f9e54a098a6b7f5eed339a2aba670c58"],["img/pdp/arrowDown.svg","7bedd6433a20340ea509907f9ac56b71"],["img/pdp/badWeather.svg","70b09179eaf8b1e7fce3b3362ae231c4"],["img/pdp/bag.jpg","b7c644b16369df93637348154066e2f5"],["img/pdp/beasien/beasien_95_SW_100.JPG","da1b9f46b70dd3cf0d81a92fda8ec0c7"],["img/pdp/beasien/beasien_98_SW_100.JPG","a8925f657c9c7f3ccdf8d05eebde7443"],["img/pdp/beasien_00.png","52b289943a07f3ef3d49f4d4795c7016"],["img/pdp/beasien_a.jpg","ae9da668547d5c165d9d6fb8b0c45285"],["img/pdp/beasien_b.jpg","dc74eaf0d850d75789aeaf0f5169e3a7"],["img/pdp/beasien_c.jpg","119cb3a4276890394d938370e799dcc8"],["img/pdp/beasien_social.jpg","62d2d405aa2dbd913df640c8ed0988ad"],["img/pdp/belt.jpg","0e835f25ac3c21ec90fe24704fda4824"],["img/pdp/carrott.png","a19fe8404f275f2d700bcaffb5e667fc"],["img/pdp/champaign.svg","44734f095d664f358e6c3cd18c8b6dec"],["img/pdp/check.svg","7de89811b99c10f68444869174f833b1"],["img/pdp/checkW.svg","478725188ed3cf7c2f069782cd5dcf7d"],["img/pdp/dress.svg","94e50f6df9fa188346cf9cb2c5ccedfd"],["img/pdp/fav.svg","e348936086e89ffdba6171a58953eeb4"],["img/pdp/hugeMen.jpg","b788000be2ea044411ad44e1d488f7a8"],["img/pdp/hugeWomen.jpg","6e7e14fea7297af12ceb1edc0e8e1589"],["img/pdp/inCart_men1.png","4a29d6e6f1bc5f6ee9d42be731467e9e"],["img/pdp/inCart_men2.png","99ba7f9f5496ac5dac7a92be0f1eb45a"],["img/pdp/inCart_women1.png","4a29d6e6f1bc5f6ee9d42be731467e9e"],["img/pdp/inCart_women2.png","c52a101a92ffa76377220a5a2e161a39"],["img/pdp/linearBkg.png","28876b946c8c9803a7dd8937b4af17fa"],["img/pdp/lintun/lintun_16_SW_100.JPG","bc804461d3104ab7c2264683c24123df"],["img/pdp/lintun/lintun_96_SW_100.JPG","07d7867aae80c3b0657b00aaf0074d77"],["img/pdp/lintun_a.jpg","a525465c431c58104fc5d94a079570f9"],["img/pdp/lintun_b.jpg","aeb733b939cc3a777ab1591b05a24213"],["img/pdp/lintun_c.jpg","cac5782bbaf71fa3c2536d5fa8b48734"],["img/pdp/lintun_social.jpg","92683f7bdf93ac155b257d1efdfbdc21"],["img/pdp/magnifier.svg","4b42f5e24af41f1979af4136f56a6b4b"],["img/pdp/mix.jpg","7f4fa36a228103d519883253f3855d8e"],["img/pdp/mixnmatch.png","db3138febd4e2e0a74031e2768118f08"],["img/pdp/reviews.png","dd74e53bf1cbe8b7c8b47b21ff930d59"],["img/pdp/save.svg","1c7e88f6ff8ddba206a5116b7b8ac8f3"],["img/pdp/share.svg","002dcccd5e5fc0bc3b3ccf8f7e245914"],["img/pdp/similarMen_1.jpg","a5630df62740e1c8b7ee8c5a8ab8d23f"],["img/pdp/similarMen_2.jpg","c67ff66399e822a2a498d5af5a292e13"],["img/pdp/similarMen_3.jpg","41ab239b5143c3a2164e40a44885c110"],["img/pdp/similarMen_4.jpg","e667b470e8bd14796076dcded25fc730"],["img/pdp/similarWomen_1.jpg","2be3e11e3245efa224b959d74854bf1b"],["img/pdp/similarWomen_2.jpg","da27e3cc7e67dcf96f0dda151e33a3a3"],["img/pdp/similarWomen_3.jpg","0c56da758960d0508e71aee9f009d8b9"],["img/pdp/similarWomen_4.jpg","96d7907ddcc6cead5fe35befb6361313"],["img/pdp/textureA.png","cc77fa129c2573bb9b5c5ed6a445acd2"],["img/pdp/textureB.png","4e332909b5785b0b6777379d9a2b94fb"],["img/pdp/zoomin.svg","9da74ab8e3cb670635a5b331f1d42491"],["img/plp/StyleAorB_A.png","643a0e5ba7452520c44c3612b921e9f1"],["img/plp/filters.jpg","a4b6300d013adb2abe2729ad7a82a32a"],["img/plp/men_PromoA.jpg","b7be041eba7e38f8cce2017f1ddaa58f"],["img/plp/men_SocialA.jpg","d000f456ad9f7efa6fcfa0df392bacc3"],["img/plp/men_SocialB.jpg","ec8b4f64190f892c69ddf849d6d9875f"],["img/plp/plpM_b.png","60202a35dfaef3c129c2eabf9658a2d9"],["img/plp/plpW_b.png","2738c41000da13013aa53af108a83016"],["img/plp/result_StyleAorB_A.png","1471c51af53fbf1f64b22474c0bf2674"],["img/plp/result_StyleAorB_B.png","3bcf0f0653bc417273befe5aea64c433"],["img/plp/women_PromoA.jpg","9117ca92782a27482578e67a0db1867b"],["img/plp/women_PromoB.jpg","658ea89485ea472e6f350b52c30689f8"],["img/plp/women_SocialA.jpg","3297e78fe0ca18a3d28e8e81c7e26e14"],["img/plp/women_SocialB.jpg","dd16fa6d614c0d3a6b212573e92accd8"],["img/products/hp/top3_A.jpg","328212c5454e5b83db296c9a547df0bd"],["img/products/hp/top3_B.jpg","153ee74a9a9244b1f7dd545f566f5a69"],["img/products/hp/top3_C.jpg","e53b5d3c0207300dac5ba41df3e2aef2"],["img/products/m2w/pro_1.jpg","1fae1665d620742a15a2cc7ecbb4cd97"],["img/products/m2w/pro_2.jpg","c5425b4e1cc8fedc53ec45fd70bd8a2e"],["img/products/m2w/pro_3.jpg","f0bb63d13d328c1c8a3f894fe56ec164"],["img/products/men/M01.jpg","1b266bcafe6f0cb499500b2fcfec4aca"],["img/products/men/M02.jpg","6978590090d4fb248327ddbec30bbf7e"],["img/products/men/M03.jpg","5c12701e8187e433b63b357441d76585"],["img/products/men/M04.jpg","451054f4c495fb91c8c8471441904ae0"],["img/products/men/M05.jpg","21d6723ab7404b97f890113957c0e6fc"],["img/products/men/M06.jpg","b7ce8b723c16e131cfc2376b75f36dfc"],["img/products/men/M07.jpg","b89f3312d99f78d3b837ef9e8f165837"],["img/products/men/M08.jpg","ab23d6a15d1f98dfc23098feb578341c"],["img/products/men/M09.jpg","ea4d80171c5c883a352b6afcf5802de0"],["img/products/men/M10.jpg","4e7f8d6fd0124410338f74407c283f03"],["img/products/men/M11.jpg","14c43d8d35bcf50663bc0044253e3387"],["img/products/men/M12.jpg","83a1059c4448d4974bdd1576408e1e63"],["img/products/men/M13.jpg","75451d3e07022c53d4cacaadcff05c1a"],["img/products/men/M14.jpg","ff8e3a1b73471557a62f394dcaf3b78b"],["img/products/men/M15.jpg","6ef306da9f29c5a5d90f650fc9e9e368"],["img/products/men/M16.jpg","370f2f83d9f493689149cdbd814bb530"],["img/products/men/M17.jpg","8e1ba55d3eff4a83a7c6862c9c69ff90"],["img/products/men/M18.jpg","fc8388529c0b6569e5b1732e68c1543b"],["img/products/men/M19.jpg","f36b3402485953cb2f62018dcfb276ab"],["img/products/men/M20.jpg","ab6eb6c5181465baf527587111fe6d94"],["img/products/men/M21.jpg","e27e135021d867da417d4116f3ad2c3a"],["img/products/men/M22.jpg","1e551c96b7fd43fa37a6783d2e5501c3"],["img/products/men/M23.jpg","9bb467e15cf516bf36673ed5f44f2df4"],["img/products/men/M24.jpg","c49df9cbe49f044dc92cd1810a8c94fb"],["img/products/men/M25.jpg","8647285cffbacc8a614ac1c9d8ef34cb"],["img/products/men/M26.jpg","ca6ef64b251e81a04eb0d97dfb2621d3"],["img/products/men/M27.jpg","48e4807cbd4a0361d9c5f0beb5a51763"],["img/products/women/W01.jpg","3dcb549275d959e6cbe561e4b26aa5d4"],["img/products/women/W02.jpg","77efe0125928b20698993efe15106e9f"],["img/products/women/W03.jpg","6fa9f33532894ffcc10f89187fc3c0f0"],["img/products/women/W04.jpg","7acbaf323da3f64162f9fda1073097d3"],["img/products/women/W05.jpg","b0faddd73df780bf4308d21efc75bcad"],["img/products/women/W06.jpg","331cc46725f984f280df1065f4701bf0"],["img/products/women/W07.jpg","7f6d79e957e8ee284c442b6e305c8342"],["img/products/women/W08.jpg","01601a00bd17bb46559fda708d7a5cad"],["img/products/women/W09.jpg","5e2db6d1176a79ed83f8db23470c9436"],["img/products/women/W10.jpg","6e6f1845d3df970a27dffc78142322c0"],["img/products/women/W11.jpg","e6618f91a967848950cfe7c22b861a4d"],["img/products/women/W12.jpg","7a44ca54b40d20025e59e3d00df4577c"],["img/products/women/W13.jpg","9afa38c94bbf2730cdd8c04c26c1c9ac"],["img/products/women/W14.jpg","08305a5e2f4f0f82c6b980ed2f6c7c5e"],["img/products/women/W15.jpg","b62fb713db65f71580deb4c4eb1d72fb"],["img/products/women/W16.jpg","3530218acbceccf7d42f29ab4926d6f8"],["img/products/women/W17.jpg","76fc9ff5dd4e49dc75bf83df31489856"],["img/products/women/W18.jpg","78f84bb766ccbe0d8ec025364dedb553"],["img/products/women/W19.jpg","48416e41769562881a3f70831c6794db"],["img/products/women/W20.jpg","3d401a6f6cd66e58bdb0da0f9b2b2d81"],["index.html","c3cd8ccbcd0983fd51b4545dbacfeb71"],["js/polyfill/shapes-polyfill.min.js","5378652a04d11b3b555b26011ccd28ec"],["js/script.js","ca622952b716a62ac6983ce4d75e4762"],["js/service-worker-registration.js","5743ccdacbe5ad1780882358cea6a1be"],["js/vendors/headroom.js","b3b5054f2393fdf270f97e484c66da5c"],["js/vendors/in-view.min.js","32c0e2abf22f626a11de44c6cee735d9"],["js/vendors/jQuery.headroom.js","2a1a70034b4a2c522341d1f84dfcf0ab"],["js/vendors/jquery-3.2.1.min.js","c9f5aeeca3ad37bf2aa006139b935f0a"],["js/vendors/jquery-3.3.1.min.js","a09e13ee94d51c524b7e2a728c7d4039"],["js/vendors/jquery.scrollTo.min.js","68541e4ce43b92fb20560a866b5493d1"],["men-desktop.html","280f69801ec085a19012c49a515973b9"],["men-desktopB.html","adc0118d24ce5d34c4a1f73ffb4c6138"],["men-mobile.html","e3ecbdd9bd1767536f2ec56c479886a8"],["metowe.html","29a827074b492d01fae48e526067364a"],["plpMen.html","c4b6025ffddd3901892ab1bd4fc90431"],["plpWomen.html","96fcf9306b97b8cfa97534e2914e8c16"],["socialplpMen.html","b4984a8e03e15be6cd7237a419d23515"],["socialplpWomen.html","23bed833ff4690d48fb8e0abcd3ebfc7"],["women-desktop.html","c228a55d265df1c24870ec9eda710b3f"],["women-desktopB.html","58c207d566ce86a6eaba999eab7b50bf"],["women-mobile.html","5e5f280693e90c79f4bac78254be7536"]];
var cacheName = 'sw-precache-v3-cis-usertesting-' + (self.registration ? self.registration.scope : '');




var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});




