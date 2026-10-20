# Round 2 Tech Trivia Dataset: Verified Items for Priority Territories, Antarctica and Major Tech Nations

This round produces 3 or more checked, non-duplicate technology trivia items for Antarctica and 23 of the 31 priority territories that were thin in round 1, plus an encyclopedia-sourced block for 22 major tech nations. It does not cover all ~250 countries and territories, and the gaps are listed explicitly below.

## TL;DR
- **Delivered:** Block A has 98 items checked during this session for Antarctica (7 items) and the priority territories (Pitcairn, Tokelau, Niue, Saint Helena, Svalbard, French Southern Territories, Montserrat, North Korea, Eritrea, Vatican City and others). The sources are government, ESA/ITU/ADB, university, company and news pages. None repeat round 1's statistic types (ITU internet-use %, EGDI, data prices, broadband speeds, Chainalysis, GCI tiers, BEAD).
- **Supplement:** Block B adds 66 historical "firsts" for 22 major tech nations (ENIAC, Linux, Skype, Python, Sputnik, QR code and others). They are sourced to canonical encyclopedia pages that were not re-fetched in this session, so run a link check before publishing.
- **Gaps:** No verifiable new items were found for the US Virgin Islands, Guadeloupe, Martinique, Aruba or Western Sahara. Saint Martin, Caribbean Netherlands and Sint Maarten have fewer than 3 items, and most remaining UN member states still need a third research round.

## Key Findings
- **Small territories' tech stories are mostly about connectivity and domains.** For most of them the trivia is a first cable, a first satellite link or an oddity in their two-letter internet domain. Saint Helena got its first fibre in 2021–2023.\[1\] Tokelau's .tk was once the world's largest ccTLD.\[2\] Niue's .nu offered internationalized domain names in 2000.\[3\] Saint Barthélemy's .bl and Saint Martin's .mf were created in 2007 but never activated.
- **Remote French and Norwegian territories matter for space infrastructure.** Kerguelen has tracked rockets from Kourou, Tanegashima and Sriharikota.\[4\] A station on Svalbard can contact a polar-orbiting satellite on all 14 of its daily orbits.\[5\] Saint Pierre and Miquelon was the hinge of France's first transatlantic telegraph cable in 1869.\[6\]
- **Antarctica works best as "big science computing" trivia.** Good examples are IceCube's 5,160 buried sensors (2010), the South Pole Telescope's first light (2007) and its role in the Event Horizon Telescope, and Starlink reaching McMurdo in 2022, which put Starlink on all seven continents.\[7\]\[8\]\[9\]\[10\]
- **Several sources conflict, and the affected rows are worded to reflect it** (details in Caveats). Examples are Saint Helena's cable landing date and branch length, the year Kerguelen's CNES station opened, and whether CTEX was the 13th or 14th Tier IV facility worldwide.

## Details

### Block A — Verified this session (priority territories + Antarctica)

```csv
country,trivia_number,trivia,tag,source
American Samoa,1,"American Samoa got its first fibre-optic link to the outside world in 2009, when it was connected to the ASH (American Samoa–Hawaii) submarine cable.",Government/Official,https://www.doi.gov/sites/doi.gov/files/4.a-astcaasg-american-samoa-infrastructure-broadband.pdf \[11\]
American Samoa,2,"In 2018 American Samoa connected to the new Hawaiki submarine cable with 200 Gbps of capacity, according to a territorial broadband briefing filed with the US Department of the Interior.",Government/Official,https://www.doi.gov/sites/doi.gov/files/4.a-astcaasg-american-samoa-infrastructure-broadband.pdf \[11\]
American Samoa,3,"When the roughly 15,000 km Hawaiki cable entered commercial service in July 2018, American Samoa was the only Pacific island able to use it from day one.",News Media,https://www.computerworld.com/article/1659228/hawaiki-cable-comes-into-service.html \[12\]
Antarctica,1,"On 18 December 2010 the final string of sensors was lowered into the ice, completing the IceCube Neutrino Observatory: 5,160 optical sensors on 86 strings buried up to two kilometres below the South Pole.",Science/Academic,https://news.wisc.edu/worlds-largest-neutrino-observatory-completed-at-south-pole/ \[7\]
Antarctica,2,"Nature reported in 2026 that the IceCube Neutrino Observatory, completed in 2010, cost US$271 million to build.",Science/Academic,https://www.nature.com/articles/d41586-026-03092-1 \[13\]
Antarctica,3,"The South Pole Telescope saw first light on 16 February 2007, when scientists aimed it at Jupiter for its first test observations.",Science/Academic,https://phys.org/news/2007-02-south-pole-telescope.html \[14\]
Antarctica,4,"The South Pole Telescope is part of the Event Horizon Telescope, the network behind the first image of a black hole (2019). Its EHT receiver first operated in January 2015 and joined the 2017 observing campaign.",Science/Academic,https://arxiv.org/pdf/1906.11239 \[15\]
Antarctica,5,"On 14 September 2022 the US National Science Foundation tweeted that Starlink was 'testing polar service with a newly deployed user terminal at McMurdo Station', and SpaceX tweeted the same day: 'Starlink is now on all seven continents!'",News Media,https://www.space.com/spacex-starlink-internet-service-antarctica
Antarctica,6,"Norway's Troll Satellite Station in Queen Maud Land received its first satellite signal on 1 March 2007. It was opened by Prime Minister Jens Stoltenberg.",Company-Marketed,https://www.ksat.no/news/news-archive/2022/celebrating-15-years-at-Troll-Station/ \[16\]
Antarctica,7,"Troll Satellite Station (built December 2004–February 2005) is paired with SvalSat in the Arctic, so together they can download data from a polar-orbiting satellite twice on every orbit.",Historical,https://en.wikipedia.org/wiki/Troll_Satellite_Station \[17\]
British Indian Ocean Territory,1,"The .io internet domain, now hugely popular with tech start-ups, was created for the British Indian Ocean Territory on 16 September 1997.",Historical,https://en.wikipedia.org/wiki/.io \[18\]
British Indian Ocean Territory,2,"The first website address ever registered under .io was levi.io, taken by Levi Strauss & Co. in 1998.",Science/Academic,https://graphsearch.epfl.ch/concept/1113865 \[19\]
British Indian Ocean Territory,3,"After the October 2024 UK–Mauritius agreement on the Chagos Islands, commentators noted that if the 'IO' country code were retired, a five-year retirement process for .io would be triggered.",News Media,https://www.theregister.com/2024/10/10/io_domain_uk_mauritius/ \[20\]
Caribbean Netherlands,1,"On 16 December 2013 the Dutch government-funded Saba Statia Cable System came ashore at Great Bay Beach, Sint Maarten, giving Saba and Sint Eustatius a fibre route to the world.",News Media,http://archive.saba-news.com/2013/12/16/sscs-fibre-cable-landed-st-maarten/ \[21\]
Caribbean Netherlands,2,"According to Dutch minister Ronald Plasterk, wholesale internet prices for providers on Saba and Sint Eustatius fell from more than US$400 to under US$40 per Mbit after cable construction began in 2012.",News Media,https://www.sxm-talks.com/the-daily-herald/completed-sea-cable-benefits-saba-statia/ \[22\]
Christmas Island,1,"In November 2024 Google announced its Australia Connect plan, including the Bosun cable: the first subsea cable linking Christmas Island to Darwin, with onward routes to Singapore.",News\[23\]\[24\] Media,https://www.theregister.com/2024/11/27/bosun_cable_darwin_christmas_island/
Christmas Island,2,"In November 2025 Google unveiled Dhivaru, a trans-Indian Ocean subsea cable linking the Maldives, Christmas Island and Oman, plus a new Google 'connectivity hub' on Christmas Island.",Company-Marketed,https://cloud.google.com/blog/products/networking/introducing-dhivaru-new-subsea-cable/ \[25\]\[26\]
Christmas Island,3,"In November 2025 Reuters reported that Google had requested power for a 7-megawatt data centre on Christmas Island. Google denied it was building 'a large artificial intelligence data centre' and called the project part of its subsea cable work.",News\[23\]\[27\]\[28\] Media,https://www.datacenterdynamics.com/en/news/google-plans-ai-data-center-on-australian-outpost-christmas-island/
Christmas Island,4,"As of late 2025, all of Christmas Island's data reached it along a single subsea cable. Google's planned TalayLink would route cables from Perth and Darwin to southern Thailand via the island.",News\[29\] Media,https://www.abc.net.au/news/2025-11-29/google-data-centre-stokes-uncertainty-on-christmas-island/105984092
Cocos (Keeling) Islands,1,"The .cc domain was delegated for the Cocos (Keeling) Islands on 13 October 1997. It went to eNIC, a Seattle company, not to anyone living on the islands.",Research/Report,https://icannwiki.org/.cc \[30\]
Cocos (Keeling) Islands,2,"Seattle businessman Brian Cartmell noticed in 1997 that the Cocos Islands' internet code was unclaimed. The .cc registry later passed to Verisign, the company that runs .com.",News Media,https://www.abc.net.au/news/science/2021-06-08/how-cocos-keeling-domain-became-haven-child-sex-abuse-material/100191896 \[31\]
Cocos (Keeling) Islands,3,"The .cc domain, marketed worldwide as an alternative to .com, has more than one million registrations, placing it in the top 50 country-code domains. Yet the islands had just 593 residents at the Australian Bureau of Statistics' 2021 census.",Research/Report,https://icannwiki.org/.cc
Cocos (Keeling) Islands,4,"In 2023 the Shire of Cocos (Keeling) Islands worked with the Australian Federal Police and Verisign to purge child-abuse websites from .cc, which had appeared on international watchlists for a decade.",News Media,https://www.abc.net.au/news/2023-05-03/cocos-keeling-islands-internet-domain-child-sexual-abuse-website/101738256 \[32\]
Cook Islands,1,"In December 2019 the Manatua One Polynesia cable landed at Aitutaki, the first submarine cable ever to reach the Cook Islands.",News Media,https://maureen-hilyard.medium.com/first-ever-submarine-cable-lands-in-the-cook-islands-f5bf2237c8f2 \[33\]
Cook Islands,2,"The Manatua cable came ashore at Rarotonga, the Cook Islands' capital island, in January 2020.",News Media,https://www.rnz.co.nz/news/pacific/407734/manatua-one-cable-lands-in-rarotonga \[34\]
Cook Islands,3,"The 3,600 km Manatua cable, the first submarine cable for both the Cook Islands and Niue, was declared ready for service on 22 July 2020.",Company-Marketed,https://www.subcom.com/documents/2020/Manatua_RFS_FINAL_22JULY2020.pdf \[35\]
Curaçao,1,"On 2 July 2013 Curaçao Technology Exchange (CTEX) became the first multi-tenant data centre in Latin America and the Caribbean to earn Uptime Institute Tier IV design certification.",Company-Marketed,https://www.prweb.com/releases/ctex_becomes_first_uptime_institute_certified_multi_tenant_tier_iv_data_center_in_latin_america_and_the_caribbean/prweb10896753.htm \[36\]
Curaçao,2,"CTEX opened its first Tier IV data centre, CU-1, on 8 March 2014 with 24 cloud customers already running. At the time Curaçao was served by five submarine cables.",Company-Marketed,https://www.prweb.com/releases/ctex_officially_opens_the_first_of_four_uptime_institute_certified_tier_iv_datacenters/prweb11653112.htm \[37\]
Curaçao,3,"In 2014 CTEX's CU-1 was certified as a Tier IV 'Constructed Facility', which the company said made it one of only 14 data centres in the world with both Tier IV design and facility certification.",Company-Marketed,https://www.prweb.com/releases/ctex_becomes_latin_america_and_the_caribbean_s_first_multi_tenant_tier_iv_datacenter_certified_for_both_design_and_constructed_facility_by_the_uptime_institute_/prweb11731426.htm \[38\]
Eritrea,1,"Eritrea launched public internet service in November 2000, one of the last countries in Africa to go online.",International\[39\] Org,https://www.itu.int/ITU-D/ict/botswana04/doc/doc/06_Eritrea_ICT_Indicators_e.pdf
Eritrea,2,"State operator EriTel started Eritrea's first mobile phone service in March 2004.",Historical,https://en.wikipedia.org/wiki/Eritrean_Telecommunications_Corporation \[40\]
Eritrea,3,"In 2010 EriTel said Eritrea's internet still came entirely by costly satellite links and that the government hoped a submarine fibre cable would bring a 'fundamental solution'.",Government/Official,https://shabait.com/2010/11/19/efforts-underway-to-expand-internet-service/ \[41\]
Eritrea,4,"Eri-TV, Eritrea's state broadcaster founded in January 1993, began satellite broadcasting and internet streaming in 2003 to reach the Eritrean diaspora.",Historical,https://en.wikipedia.org/wiki/Eri-TV \[42\]
French Guiana,1,"The Guiana Space Centre in Kourou became operational on 9 April 1968 with the launch of a French Véronique sounding rocket.",International Org,https://www.esa.int/About_Us/50_years_of_ESA/CSG_at_50_half_a_century_of_Europe_s_Spaceport \[43\]
French Guiana,2,"The first satellite launched into orbit from Kourou was the Franco-German DIAL-WIKA, on a French Diamant-B rocket in 1970.",International Org,https://www.esa.int/About_Us/50_years_of_ESA/CSG_at_50_half_a_century_of_Europe_s_Spaceport \[43\]
French Guiana,3,"On Christmas Eve 1979 the first Ariane rocket lifted off from the Guiana Space Centre, the start of Europe's independent access to space.",International Org,https://www.esa.int/About_Us/50_years_of_ESA/CSG_at_50_half_a_century_of_Europe_s_Spaceport \[43\]
French Guiana,4,"French Guiana's .gf domain was run by a local internet provider until 2026. In June 2026 France awarded its management to Afnic, the .fr registry, with a handover due before the end of 2026.",Government/Official,https://www.afnic.fr/en/products-and-services/french-overseas-cctlds/french-overseas-top-level-domains/ \[44\]
French Southern Territories,1,"France's space agency CNES has run a satellite tracking station at Port-aux-Français in the Kerguelen Islands since the early 1990s (1992 according to the European Polar Board).",Research/Report,https://data.europeanpolarboard.org/stations/?no_cache=1&tx_infradatabase_stations%5Bcode%5D=CO1106&tx_infradatabase_stations%5Baction%5D=stationinfo&tx_infradatabase_stations%5Bcontroller%5D=Frontend&cHash=cc63c43af6aa599843510e2bee09b91a \[45\]
French Southern Territories,2,"Kerguelen's tracking station was placed on French soil in the Southern Hemisphere so it could follow Ariane rockets from Kourou as well as Japanese launches from Tanegashima and Indian launches from Sriharikota.",Science/Academic,https://scholarspace.manoa.hawaii.edu/server/api/core/bitstreams/a823af18-ce00-4532-87ce-b753f5f6e710/content \[4\]
French Southern Territories,3,"The KERG GNSS reference station at Kerguelen, installed on 16 November 1994, now tracks GPS, Galileo, GLONASS, BeiDou, QZSS and India's IRNSS satellites.",Government/Official,https://regina.cnes.fr/en/stations/KERG \[46\]\[47\]
French Southern Territories,4,"Port-aux-Français began in 1951 as a permanent weather station and grew greatly during the International Geophysical Year (1957–58). Today it houses up to 120 staff in summer.",Science/Academic,https://www.geoscience.scar.org/geodesy/perm_ob/gps/kerguelen.htm \[48\]
Mayotte,1,"In 2019 the 400 km FLY-LION3 fibre cable landed at Kaweni (Mamoudzou), giving Mayotte a new 4 Tbps route to the global internet and a direct link to Grande Comore.",Company-Marketed,https://newsroom.orange.com/high-speed-broadband-submarine-cable-fly-lion3-makes-landfall-in-mayotte/ \[49\]
Mayotte,2,"Mayotte's first cable connectivity came from LION2, a 2,700 km, €57 million submarine cable linking the LION network to Mayotte and Mombasa, Kenya.",Historical,https://en.wikipedia.org/wiki/LION_(cable_system) \[50\]
Mayotte,3,"On 5–6 October 2018 the LION2 cable broke, severely cutting Mayotte's digital access for days. The outage showed why a second cable (FLY-LION3) was needed.",Historical,https://en.wikipedia.org/wiki/LION_(cable_system) \[50\]
Montserrat,1,"After felt earthquakes in early 1966, the Seismic Research Unit installed four seismograph stations on Montserrat. Hurricane Hugo destroyed the whole network in 1989, and it was not restored until 1992.",Government/Official,https://www.mvo.ms/who-we-are/history-of-mvo/ \[51\]
Montserrat,2,"Within nine days of the Soufrière Hills eruption starting on 18 July 1995, Montserrat's four-station analog seismic network was expanded to 10 telemetered sites using a USGS data system.",Government/Official,https://www.usgs.gov/publications/capturing-preserving-and-digitizing-legacy-seismic-data-montserrat-volcano-observatory \[52\]
Montserrat,3,"In October 1996 the British Geological Survey added a digital seismic network on Montserrat. The older analog network holds the only seismic data from the eruption's first 15 months.",Government/Official,https://pubs.usgs.gov/publication/70260155 \[53\]\[54\]
Montserrat,4,"A 2020 data-rescue project converted more than 230,000 Montserrat seismic events from legacy formats (SUDS, Hypo71, Seislog) into the modern miniSEED standard, following FAIR data principles.",Science/Academic,https://www.usgs.gov/publications/capturing-preserving-and-digitizing-legacy-seismic-data-montserrat-volcano-observatory \[52\]\[55\]
Montserrat,5,"The Montserrat Volcano Observatory was made a statutory body by the Montserrat Volcano Observatory Act of 1999.",Government/Official,https://www.mvo.ms/who-we-are/history-of-mvo/ \[51\]
Niue,1,"On 23 June 2003 the Internet Users Society – Niue announced 'the world's first free nation-wide WiFi', a claim later disputed by Niue's own government.",News Media,https://www.lightreading.com/wifi/world-s-first-wifi-nation \[56\]
Niue,2,"The Internet Users Society – Niue introduced free email on the island in 1997 and free full internet access in 1999, funded by sales of .nu domains.",News Media,https://www.lightreading.com/wifi/world-s-first-wifi-nation \[56\]
Niue,3,"In March 2000 .NU Domain Ltd became the first top-level domain to offer internationalized domain names supporting the full Unicode character set.",Historical,https://en.wikipedia.org/wiki/.nu \[3\]
Niue,4,"Because 'nu' means 'now' in Swedish, Danish and Dutch, operation of .nu moved to the Swedish Internet Foundation in September 2013. At that time two-thirds (66.7%) of active .nu domains belonged to Swedish users.",Historical,https://en.wikipedia.org/wiki/.nu \[57\]
Niue,5,"Niue's first-ever submarine cable, Manatua, was declared ready for service on 22 July 2020.",Company-Marketed,https://www.subcom.com/documents/2020/Manatua_RFS_FINAL_22JULY2020.pdf \[35\]
North Korea,1,"North Korea's first website, the Naenara portal, was created in 1996, and its closed national intranet Kwangmyong came into service in the early 2000s.",Historical,https://en.wikipedia.org/wiki/Kwangmyong_(network) \[58\]\[59\]
North Korea,2,"In 2006 around 300 Kwangmyong users organised a flash mob at Pyongyang Gymnasium to celebrate Naenara's 10th anniversary. Afterwards, all chat rooms were removed from the North Korean intranet.",Historical,https://en.wikipedia.org/wiki/Kwangmyong_(network) \[59\]
North Korea,3,"North Korea built its own Linux operating system, Red Star OS, at the Korea Computer Center. The Pyongyang Times reported that version 4.0 had been developed by January 2019.",Historical,https://en.wikipedia.org/wiki/Red_Star_OS \[60\]
North Korea,4,"Red Star OS ships with Naenara, a browser based on Mozilla Firefox that can browse only North Korea's domestic intranet, not the global internet.",Historical,https://en.wikipedia.org/wiki/Naenara_(browser) \[61\]\[62\]
North Korea,5,"North Korea's Central Bank launched an electronic payment system on the Kwangmyong intranet in 2020.",Historical,https://en.wikipedia.org/wiki/Kwangmyong_(network) \[59\]
Northern Mariana Islands,1,"On 22 June 2017 NEC announced that the 280 km ATISA fibre cable linking Guam with Saipan, Tinian and Rota was complete and operational.",Company-Marketed,https://www.nec.com/en/press/201706/global_20170622_01.html \[63\]
Northern Mariana Islands,2,"The ATISA cable (2017) takes its name from the Chamorro word 'atisa', meaning 'to illuminate; to accelerate'.",Company-Marketed,https://www.nec.com/en/press/201706/global_20170622_01.html \[63\]
Northern Mariana Islands,3,"The earlier MICS fibre cable connecting Saipan, Tinian, Rota and Guam was licensed by the US Federal Communications Commission in 1993.",Government/Official,https://www.fcc.gov/submarine-cable-landing-licenses-granted \[64\]
Pitcairn Islands,1,"Pitcairn has had a dedicated satellite connection since 2002, extended in 2007 to provide phone and internet service to every household.",Historical,https://en.wikipedia.org/wiki/Telephone_numbers_in_the_Pitcairn_Islands \[65\]
Pitcairn Islands,2,"Before Starlink, Pitcairn's bandwidth was so scarce that officials had to 'turn off' the internet for the rest of the island to run court hearings by video-conference.",News Media,https://www.stuff.co.nz/world/south-pacific/130535477/one-of-the-most-isolated-places-on-earth-finally-gets-highspeed-internet \[66\]
Pitcairn Islands,3,"In 2022 Pitcairn became a test site for Starlink's new satellite-to-satellite laser links. These were designed for places too far from any SpaceX ground station, and the equipment was shipped to Adamstown free of charge.",Government/Official,https://www.visitpitcairn.pn/the-pitkern-blog/one-of-the-most-isolated-places-on-earth-finally-gets-high-speed-internet \[67\]
Pitcairn Islands,4,"In March 2024 Pitcairn's internet fully switched to Starlink, with a terminal at every private home and government building.",Research/Report,https://www.noonsite.com/place/pitcairn-island/view/communications/ \[68\]
Réunion,1,"Réunion's LION submarine cable to Madagascar has been in service since 2009. It was later extended by LION2 to Kenya via Mayotte.",News Media,https://parallelesud.com/lancement-officieldu-cable-sous-marin-reunion/ \[69\]
Réunion,2,"The METISS cable, linking Réunion with Mauritius and South Africa, entered service in 2018 and gave the island its third international cable.",News Media,https://parallelesud.com/lancement-officieldu-cable-sous-marin-reunion/ \[69\]
Réunion,3,"The LION cable connecting Madagascar, Réunion and Mauritius was announced in March 2008 and gave Madagascar direct access to the global high-speed network via Réunion.",Historical,https://en.wikipedia.org/wiki/LION_(cable_system) \[50\]
Saint Barthélemy,1,"On 21 September 2007 the ISO 3166 Maintenance Agency gave Saint Barthélemy its own country code, BL, after the island became a separate French overseas collectivity on 15 July 2007.",Research/Report,https://www.bb-online.com/countryinformation/bl.shtml \[70\]
Saint Barthélemy,2,"The .bl internet domain was created in 2007 but has never been delegated, according to Afnic, the .fr registry.",Government/Official,https://www.afnic.fr/en/products-and-services/french-overseas-cctlds/french-overseas-top-level-domains/ \[44\]
Saint Barthélemy,3,"Because .bl is still unassigned (as of 2026), websites in St Barts use France's .fr or Guadeloupe's .gp instead.",Historical,https://en.wikipedia.org/wiki/.bl \[71\]
Saint Helena,1,"On 29 August 2021 the Saint Helena branch of Google's Equiano cable came ashore at Rupert's Beach. The St Helena Government called it 'the first shore landing of the cable in the entire Equiano Cable Project'.",Government/Official,https://www.sainthelena.gov.sh/2021/news/fibre-optic-cable-landed-on-st-helena/
Saint Helena,2,"Saint Helena's own branch of the Equiano cable is about 1,154 km long, connecting the island to the main trunk running from Portugal to South Africa (landed 2021).",Government/Official,https://www.sainthelena.gov.sh/2021/news/fibre-optic-cable-landed-on-st-helena/ \[72\]\[73\]
Saint Helena,3,"When the Equiano branch went live on 1 October 2023, network monitor Kentik measured Saint Helena's latency to London falling from 657 ms to 131 ms.",News Media,https://www.datacenterdynamics.com/en/news/googles-equiano-cable-branch-to-saint-helena-activated/ \[1\]
Saint Helena,4,"In May 2023 satellite operator OneWeb announced plans for a ground station on Saint Helena and signed a 10-year deal with local telco Sure for capacity on the cable.",News Media,https://www.datacenterdynamics.com/en/news/googles-equiano-cable-branch-to-saint-helena-activated/ \[1\]
Saint Martin,1,"MF was assigned as Saint Martin's ISO country code in 2007, but the .mf internet domain has never been delegated to any registry.",Historical,https://en.wikipedia.org/wiki/.mf \[74\]
Saint Martin,2,"As of 2026 Afnic, the French registry, still lists .mf as 'created in 2007 but not delegated', alongside its twin .bl.",Government/Official,https://www.afnic.fr/en/products-and-services/french-overseas-cctlds/french-overseas-top-level-domains/ \[44\]
Saint Pierre and Miquelon,1,"In 1869 France laid its first transatlantic telegraph cable, from near Brest to Saint-Pierre and on to Duxbury, Massachusetts, breaking Britain's hold on Atlantic telegraphy.",Historical,https://atlantic-cable.com/Article/1869French/index.htm \[6\]\[75\]\[76\]
Saint Pierre and Miquelon,2,"Of the 12 French transatlantic telegraph cables laid between 1869 and 1897, six passed through Saint-Pierre or Miquelon.",Historical,https://www.acadian.org/history/history-saint-pierre-miquelon/ \[77\]
Saint Pierre and Miquelon,3,"In 1879 Siemens' cable ship Faraday laid a 2,242-nautical-mile cable from Brest to Saint-Pierre, then 827 more nautical miles to Cape Cod. The work was completed in November 1879.",Government/Official,https://www.nps.gov/caco/planyourvisit/nauset-light-beach.htm \[78\]
Saint Pierre and Miquelon,4,"Saint-Pierre-et-Miquelon hosts a European satellite navigation ground station. Its older ESA/CNES Ariane tracking station near the Galantry lighthouse went out of service on 16 February 2025.",Historical,https://en.wikipedia.org/wiki/Saint_Pierre_and_Miquelon_Satellite_Station \[79\]
Sint Maarten,1,"On 16 December 2013 the Saba Statia Cable System landed at the SMITCOMS station on Great Bay Beach, making Sint Maarten the gateway for Saba's and Sint Eustatius's fibre links.",News Media,http://archive.saba-news.com/2013/12/16/sscs-fibre-cable-landed-st-maarten/ \[80\]
Svalbard and Jan Mayen,1,"SvalSat, near Longyearbyen, can reach a polar-orbiting satellite on all 14 of its daily orbits, whereas mainland Tromsø reaches only 10 of the 14 (2004 analysis).",Science/Academic,https://arc.aiaa.org/doi/pdf/10.2514/6.2004-348-188 \[5\]
Svalbard and Jan Mayen,2,"The first phone call over Svalbard's new undersea fibre cable was made on 5 November 2003, and the system became fully operational on 1 February 2004.",Research/Report,https://www.airport-technology.com/projects/svalbard/ \[81\]
Svalbard and Jan Mayen,3,"Svalbard's twin fibre cables to mainland Norway, in operation since 2004, have an estimated technical lifespan only until the end of 2028, according to owner Space Norway.",Company-Marketed,https://spacenorway.com/infrastructure/subsea-fibre-cables/fibre-optic-cables/ \[82\]
Svalbard and Jan Mayen,4,"By 2025 SvalSat had grown to more than 150 antennas, and USGS Landsat satellite data comes down to Earth there.",News Media,https://undark.org/2025/03/19/global-satellite-infrastructure-norway/ \[83\]
Svalbard and Jan Mayen,5,"Svalbard's undersea cable was paid for by satellite operators, who paid the same transmission fees they would have paid for satellite links until the cable was paid off (built 2003–2004).",Historical,https://en.wikipedia.org/wiki/Svalbard_Satellite_Station \[84\]
Tokelau,1,"In October 2012 Tokelau became the first country to meet all its electricity needs from solar power, using 4,032 panels, 392 inverters and 1,344 batteries across its three atolls.",International\[85\]\[86\] Org,https://www.spc.int/updates/blog/2016/11/zoom-tokelau-leads-world-in-renewable-energy
Tokelau,2,"In 2001 Dutch entrepreneur Joost Zuurbier visited Tokelau and proposed paying the islanders for the right to sell .tk internet addresses.",Research/Report,https://icannwiki.org/.tk \[87\]
Tokelau,3,"At its mid-2010s peak, Tokelau's free .tk domain ranked first in the world with 31,311,498 registered names, versus 16,810,737 for second-placed China's .cn.",Historical,https://en.wikipedia.org/wiki/.tk
Tokelau,4,"On 13 June 2012 CNN reported that 'one-sixth of their economy comes from the sale of .tk domains', in a territory with a GDP of about $1.2 million a year. Teletok, the local telecom operator, later told MIT Technology Review that .tk revenue was 'very small'.",Research/Report,https://domainsproject.org/blog/tiny-islands-massive-tlds
Tokelau,5,"ICANN terminated Freenom's registrar accreditation in November 2023, and on 12 February 2024 Freenom announced it was leaving the domain business, freezing new .tk registrations.",Research/Report,https://www.dataprovider.com/blog/domains/the-tk-story/ \[88\]\[89\]
US Minor Outlying Islands,1,"In 1935 Pan Am built an Adcock radio direction-finding station on Wake Island to guide its trans-Pacific China Clipper flying boats to the tiny atoll.",Historical,https://www.panam.org/pan-am-jul-1935 \[90\]
US Minor Outlying Islands,2,"On 9 July 1962 the Starfish Prime nuclear test exploded about 400 km above Johnston Atoll. Its electromagnetic pulse and radiation belts damaged several satellites.",News Media,https://www.nationalgeographic.com/premium/article/why-the-us-once-set-off-a-nuclear-bomb-in-space-called-starfish-prime \[91\]\[92\]
US Minor Outlying Islands,3,"In 1937 Pan Am's high-frequency direction-finding station on Midway Island listened for Amelia Earhart's radio signals after she disappeared.",Research/Report,https://tighar.org/Projects/Earhart/Archives/Research/ResearchPapers/Brandenburg/RDFResearch/DFpaper.pdf \[93\]
Vatican City,1,"On 20 March 2014 Japan's NTT DATA began digitizing the Vatican Apostolic Library, whose full plan covers some 82,000 manuscripts and about 41 million pages.",Company-Marketed,https://www.nttdata.com/global/en/news/press-release/2016/july/2016/reproductions-of-rare-vatican-manuscript-to-be-presented-to-project-donors \[94\]
Vatican City,2,"In October 2014 the Vatican Library put more than 4,000 digitized ancient manuscripts online in a high-definition viewer built on NTT DATA's AMLAD archive technology.",News\[95\]\[96\] Media,https://phys.org/news/2014-10-vatican-manuscripts-digital-archive-online.html
Vatican City,3,"In 2016 the Vatican Library, NTT DATA and Canon offered facsimiles of the 1,600-year-old 'Vatican Virgil' manuscript to the first 200 donors to the digitization project.",Company-Marketed,https://global.canon/en/news/2016/20160708.html \[97\]
Vatican City,4,"In 2023 NTT DATA and the Vatican Library launched an experimental Web3 project to grow the Library's online community.",Company-Marketed,https://www.global.ntt/insights-hub/connecting-past-present-and-future-in-partnership-with-vatican-city/ \[98\]
Wallis and Futuna,1,"Wallis and Futuna connected to the world by fibre through a spur of the Tui-Samoa cable, which was officially launched on 9 February 2018.",International Org,https://www.adb.org/sites/default/files/project-documents/47320/47320-001-pcr-en.pdf \[99\]
Wallis and Futuna,2,"A 260 km domestic submarine cable linking Wallis and Futuna to each other became ready for service in December 2017.",International Org,https://www.itu.int/en/ITU-D/Regulatory-Market/Documents/Infrastructure_portal/Maximising-availability-of-int-connectivity-in-the-pacific.pdf \[100\]
Wallis and Futuna,3,"The Tui-Samoa cable serving Wallis and Futuna was designed for 8 Tbit/s using 100 Gbit/s wavelengths and cost an estimated US$40 million (in service 2018).",International Org,https://www.itu.int/en/ITU-D/Regulatory-Market/Documents/Infrastructure_portal/Maximising-availability-of-int-connectivity-in-the-pacific.pdf \[100\]\[101\]
Wallis and Futuna,4,"According to the territory's official website, superfast fibre internet reached Wallis and Futuna in August 2018, and developing online business became a stated economic priority.",Government/Official,https://www.wallis-et-futuna.wf/en/setting \[102\]
```

### Block B — Major tech nations (encyclopedia-sourced historical firsts; link-check before publishing)

```csv
country,trivia_number,trivia,tag,source
Australia,1,"CSIRAC, Australia's first digital computer, ran its first program in 1949 and is the oldest surviving first-generation electronic computer.",Historical,https://en.wikipedia.org/wiki/CSIRAC
Australia,2,"In the 1990s CSIRO radio astronomer John O'Sullivan's team developed and patented wireless LAN technology later used in Wi-Fi.",Historical,https://en.wikipedia.org/wiki/John_O%27Sullivan_(engineer)
Australia,3,"Software company Atlassian was founded in Sydney in 2002 by university friends Mike Cannon-Brookes and Scott Farquhar.",Historical,https://en.wikipedia.org/wiki/Atlassian
Canada,1,"On 29 September 1962 Canada launched Alouette 1, becoming the third country, after the USSR and the US, to have a satellite it designed and built itself.",Historical,https://en.wikipedia.org/wiki/Alouette_1
Canada,2,"Research In Motion, maker of the BlackBerry, was founded in Waterloo, Ontario, in 1984 by Mike Lazaridis and Douglas Fregin.",Historical,https://en.wikipedia.org/wiki/BlackBerry_Limited
Canada,3,"Calgary-born James Gosling created the Java programming language at Sun Microsystems, released in 1995.",Historical,https://en.wikipedia.org/wiki/James_Gosling
China,1,"China's first satellite, Dong Fang Hong 1, was launched on 24 April 1970 and broadcast the song 'The East Is Red' from orbit.",Historical,https://en.wikipedia.org/wiki/Dong_Fang_Hong_1
China,2,"China's first email was sent in September 1987 and read: 'Across the Great Wall we can reach every corner in the world.'",Historical,https://en.wikipedia.org/wiki/Internet_in_China
China,3,"Huawei was founded in Shenzhen in 1987 by former army engineer Ren Zhengfei.",Historical,https://en.wikipedia.org/wiki/Huawei
Denmark,1,"Danish computer scientist Bjarne Stroustrup began creating C++ at Bell Labs in 1979.",Historical,https://en.wikipedia.org/wiki/Bjarne_Stroustrup
Denmark,2,"Copenhagen-born Anders Hejlsberg wrote Turbo Pascal (1983) and was lead architect of Microsoft's C# language (2000).",Historical,https://en.wikipedia.org/wiki/Anders_Hejlsberg
Denmark,3,"Bluetooth wireless technology (1990s) is named after the 10th-century Danish king Harald Bluetooth, and its logo combines his runic initials.",Historical,https://en.wikipedia.org/wiki/Bluetooth
Estonia,1,"Skype, launched in 2003, was built by Estonian engineers Ahti Heinla, Priit Kasesalu and Jaan Tallinn.",Historical,https://en.wikipedia.org/wiki/Skype
Estonia,2,"From 27 April 2007 Estonia suffered weeks of cyberattacks on banks, media and government sites after a Soviet war memorial was relocated, one of the first cyberattacks on a whole nation.",Historical,https://en.wikipedia.org/wiki/2007_cyberattacks_on_Estonia
Estonia,3,"On 1 December 2014 Estonia became the first country to offer e-Residency, a government-issued digital identity for non-residents.",Historical,https://en.wikipedia.org/wiki/E-Residency_of_Estonia
Finland,1,"On 25 August 1991 Helsinki student Linus Torvalds announced the hobby operating system that became Linux.",Historical,https://en.wikipedia.org/wiki/Linux
Finland,2,"Internet Relay Chat (IRC) was created in August 1988 by Jarkko Oikarinen at the University of Oulu.",Historical,https://en.wikipedia.org/wiki/Internet_Relay_Chat
Finland,3,"The Secure Shell (SSH) protocol was invented in 1995 by Tatu Ylönen at Helsinki University of Technology after a password-sniffing attack on the university network.",Historical,https://en.wikipedia.org/wiki/Secure_Shell
France,1,"France's Minitel videotex network was rolled out nationwide in 1982, years before the web, and was finally switched off on 30 June 2012.",Historical,https://en.wikipedia.org/wiki/Minitel
France,2,"French inventor Roland Moreno patented the memory chip card, the forerunner of today's smart cards, in 1974.",Historical,https://en.wikipedia.org/wiki/Roland_Moreno
France,3,"On 26 November 1965 France launched Astérix on its own Diamant rocket, becoming the third nation to put a satellite in orbit with its own launcher.",Historical,https://en.wikipedia.org/wiki/Ast%C3%A9rix_(satellite)
Germany,1,"On 12 May 1941 Konrad Zuse presented the Z3 in Berlin, the world's first working programmable, fully automatic digital computer.",Historical,https://en.wikipedia.org/wiki/Z3_(computer)
Germany,2,"The MP3 audio format was developed largely at Germany's Fraunhofer Institute, led by Karlheinz Brandenburg, and standardised in the early 1990s.",Historical,https://en.wikipedia.org/wiki/MP3
Germany,3,"SAP was founded in 1972 by five former IBM employees in Weinheim, Germany.",Historical,https://en.wikipedia.org/wiki/SAP
Hungary,1,"Budapest-born John von Neumann described the stored-program 'von Neumann architecture' in his 1945 report on the EDVAC.",Historical,https://en.wikipedia.org/wiki/John_von_Neumann
Hungary,2,"Budapest-born Charles Simonyi led development of Microsoft Word and became a space tourist on the ISS in 2007 and again in 2009.",Historical,https://en.wikipedia.org/wiki/Charles_Simonyi
Hungary,3,"Presentation software company Prezi was founded in Budapest in 2009.",Historical,https://en.wikipedia.org/wiki/Prezi
India,1,"India's first satellite, Aryabhata, was launched on 19 April 1975 aboard a Soviet rocket.",Historical,https://en.wikipedia.org/wiki/Aryabhata_(satellite)
India,2,"Infosys was founded in Pune in 1981 by seven engineers, including N. R. Narayana Murthy.",Historical,https://en.wikipedia.org/wiki/Infosys
India,3,"On 23 August 2023 Chandrayaan-3 made India the first country to land a spacecraft near the Moon's south pole.",Historical,https://en.wikipedia.org/wiki/Chandrayaan-3
Israel,1,"ICQ, one of the first mass-market instant messengers, was launched in 1996 by the Israeli start-up Mirabilis.",Historical,https://en.wikipedia.org/wiki/ICQ
Israel,2,"Mobileye, the driver-assistance vision company, was founded in Jerusalem in 1999 and bought by Intel in 2017.",Historical,https://en.wikipedia.org/wiki/Mobileye
Israel,3,"The Israeli navigation app Waze was acquired by Google in 2013.",Historical,https://en.wikipedia.org/wiki/Waze
Italy,1,"Olivetti's Programma 101, unveiled at the 1965 New York World's Fair, is often called the first commercial desktop programmable computer.",Historical,https://en.wikipedia.org/wiki/Programma_101
Italy,2,"Italian physicist Federico Faggin led the design of the Intel 4004, the first commercial microprocessor, released in 1971.",Historical,https://en.wikipedia.org/wiki/Federico_Faggin
Italy,3,"Bologna-born Guglielmo Marconi received the first transatlantic radio signal on 12 December 1901.",Historical,https://en.wikipedia.org/wiki/Guglielmo_Marconi
Japan,1,"Sony launched the Walkman portable cassette player on 1 July 1979.",Historical,https://en.wikipedia.org/wiki/Walkman
Japan,2,"The QR code was invented in 1994 by Denso Wave, a Toyota group company, to track car parts.",Historical,https://en.wikipedia.org/wiki/QR_code
Japan,3,"Yukihiro 'Matz' Matsumoto publicly released the Ruby programming language in 1995.",Historical,https://en.wikipedia.org/wiki/Ruby_(programming_language)
Netherlands,1,"Guido van Rossum first released Python in February 1991, having started it at the CWI research institute in Amsterdam.",Historical,https://en.wikipedia.org/wiki/Python_(programming_language)
Netherlands,2,"Dutch computer scientist Edsger Dijkstra devised his famous shortest-path algorithm in 1956.",Historical,https://en.wikipedia.org/wiki/Edsger_W._Dijkstra
Netherlands,3,"Philips introduced the compact audio cassette in 1963.",Historical,https://en.wikipedia.org/wiki/Cassette_tape
Norway,1,"Simula 67, created by Ole-Johan Dahl and Kristen Nygaard at the Norwegian Computing Center, is considered the first object-oriented programming language.",Historical,https://en.wikipedia.org/wiki/Simula
Norway,2,"In 1973 the seismic array NORSAR became the first non-US connection to the ARPANET.",Historical,https://en.wikipedia.org/wiki/NORSAR
Norway,3,"The Opera web browser began as a research project at Norwegian telecom Telenor in 1994, and Opera Software was spun off in 1995.",Historical,https://en.wikipedia.org/wiki/Opera_(web_browser)
Puerto Rico,1,"The Arecibo Observatory's 305-metre dish was completed in 1963 and was the world's largest single-aperture radio telescope until China's FAST in 2016.",Historical,https://en.wikipedia.org/wiki/Arecibo_Observatory
Puerto Rico,2,"On 16 November 1974 Arecibo beamed the 1,679-bit 'Arecibo message' toward the M13 star cluster.",Historical,https://en.wikipedia.org/wiki/Arecibo_message
Puerto Rico,3,"Arecibo's 900-tonne instrument platform collapsed onto the dish on 1 December 2020, ending 57 years of operation.",Historical,https://en.wikipedia.org/wiki/Arecibo_Observatory
Russia,1,"The Soviet Union launched Sputnik 1, the first artificial satellite, on 4 October 1957.",Historical,https://en.wikipedia.org/wiki/Sputnik_1
Russia,2,"Tetris was created in 1984 by Alexey Pajitnov at the Soviet Academy of Sciences' computing centre in Moscow.",Historical,https://en.wikipedia.org/wiki/Tetris
Russia,3,"Cybersecurity firm Kaspersky Lab was founded in Moscow in 1997.",Historical,https://en.wikipedia.org/wiki/Kaspersky_Lab
South Korea,1,"Samsung was founded in 1938 by Lee Byung-chul as a small trading company in Daegu.",Historical,https://en.wikipedia.org/wiki/Samsung
South Korea,2,"KAIST, South Korea's flagship science and technology university, was founded in 1971.",Historical,https://en.wikipedia.org/wiki/KAIST
South Korea,3,"Naver, South Korea's dominant search portal, was founded in 1999.",Historical,https://en.wikipedia.org/wiki/Naver
Sweden,1,"Bluetooth was developed at Ericsson in Lund in the 1990s, with engineer Jaap Haartsen a key inventor.",Historical,https://en.wikipedia.org/wiki/Bluetooth
Sweden,2,"Spotify was founded in Stockholm in 2006 by Daniel Ek and Martin Lorentzon.",Historical,https://en.wikipedia.org/wiki/Spotify
Sweden,3,"The MySQL database was first released in 1995 by the Swedish company MySQL AB.",Historical,https://en.wikipedia.org/wiki/MySQL
Switzerland,1,"Tim Berners-Lee proposed the World Wide Web at CERN near Geneva in March 1989, and the first website went live there in 1991.",Historical,https://en.wikipedia.org/wiki/World_Wide_Web
Switzerland,2,"Niklaus Wirth created the Pascal programming language at ETH Zurich in 1970.",Historical,https://en.wikipedia.org/wiki/Pascal_(programming_language)
Switzerland,3,"Logitech was founded in 1981 in Apples, Switzerland.",Historical,https://en.wikipedia.org/wiki/Logitech
Taiwan,1,"TSMC was founded in 1987 by Morris Chang as the world's first dedicated semiconductor foundry.",Historical,https://en.wikipedia.org/wiki/TSMC
Taiwan,2,"Acer was founded in 1976 under the name Multitech.",Historical,https://en.wikipedia.org/wiki/Acer_Inc.
Taiwan,3,"ASUS was founded in Taipei in 1989.",Historical,https://en.wikipedia.org/wiki/Asus
United Kingdom,1,"On 21 June 1948 the Manchester Baby ran the world's first program stored in electronic memory.",Historical,https://en.wikipedia.org/wiki/Manchester_Baby
United Kingdom,2,"Colossus, designed by Tommy Flowers and used at Bletchley Park from 1944 to break German ciphers, was the first programmable electronic digital computer.",Historical,https://en.wikipedia.org/wiki/Colossus_computer
United Kingdom,3,"The first ARM processor came back from the factory working in April 1985 at Acorn Computers in Cambridge.",Historical,https://en.wikipedia.org/wiki/ARM_architecture_family
United States,1,"ENIAC, the first general-purpose electronic digital computer, was unveiled at the University of Pennsylvania in 1946.",Historical,https://en.wikipedia.org/wiki/ENIAC
United States,2,"On 29 October 1969 the first ARPANET message was sent from UCLA to the Stanford Research Institute. The system crashed after just two letters, 'LO'.",Historical,https://en.wikipedia.org/wiki/ARPANET
United States,3,"Hewlett-Packard was founded in 1939 in a Palo Alto garage, now known as the 'birthplace of Silicon Valley'.",Historical,https://en.wikipedia.org/wiki/Hewlett-Packard
```

JSON: each CSV block converts directly to a JSON array of objects with the keys country, trivia_number, trivia, tag and source. The CSV is the canonical deliverable.

### Places with fewer than 3 verifiable new items this round
- **Zero items:** US Virgin Islands, Guadeloupe, Martinique, Aruba, Western Sahara. Unverified leads to research: the St. Croix VLBA radio antenna (USVI), the Kanawa cable between Martinique and French Guiana, ECFS cable landings (Guadeloupe and Martinique), ALBA-1/PAN-AM cable landings (Aruba) and the unassigned .eh domain (Western Sahara).
- **Fewer than 3:** Saint Martin (2), Caribbean Netherlands (2), Sint Maarten (1).
- **Not yet covered in round 2:** every UN member state not listed in Block A or Block B, and these named territories: Taiwan's neighbours Hong Kong and Macau, Greenland (one lead: PHP creator Rasmus Lerdorf was born in Qeqertarsuaq in 1968), Faroe Islands, Gibraltar, Guam, Bermuda, Cayman Islands, Kosovo, Palestine, New Caledonia, French Polynesia, Isle of Man, Jersey, Guernsey, Falkland Islands, British Virgin Islands, Turks and Caicos, Anguilla, Norfolk Island.

## Recommendations
- **Publish Block A now.** It is the high-value gap-filler for round 1's weakest territories, and every row was checked against a source during this session.
- **Link-check Block B before it goes live.** The facts are standard encyclopedia history, but the URLs are canonical article addresses that were not re-fetched here. For pages that will be seen a lot, consider swapping in Britannica or museum sources (e.g., Computer History Museum).
- **Run round 3 country by country, using a "first cable / first satellite / domain oddity / famous native inventor" template.** That pattern reliably produced 3 or more items for even the smallest territories here.

## Caveats
- **Conflicting sources:**
  - Saint Helena's Equiano landing appears as 26 August and 29 August 2021 on government pages. The row uses 29 August, from the dated press release. The branch length is 1,154 km per the government and 1,140 km per DCD.\[1\]\[72\]\[73\]
  - Kerguelen's CNES station dates from 1992 per the European Polar Board but 1994 per SCAR.\[45\]\[48\]
  - CTEX was the 14th Tier IV facility worldwide per its press release but the 13th per Curaçao Business Magazine.\[38\]\[103\]
  - McMurdo's pre-Starlink bandwidth is reported as 17 Mbps by Space Explored, and Wikipedia's "Telecommunications in Antarctica" also says McMurdo "has permanent access to a shared 17 Mbit/s connection". DCD reported about 25 Mbps, which remains unconfirmed, so the figure was left out of the rows.
- **Disputed claims, worded accordingly:** Niue's "first WiFi nation" claim (2003) was publicly challenged as neither free nor nationwide.\[104\] Tokelau's "one-sixth of GDP" .tk figure was disputed by Teletok.\[105\] Google denied the "large AI data centre" framing for Christmas Island.\[106\]
- **Weaker sources:** The Cook Islands landing (a Medium repost of an operator press release), the Saba/Statia price drop (an aggregator repost of The Daily Herald), the Midway item (TIGHAR, a research group) and Pitcairn's 2024 Starlink switch (noonsite, a sailing-information site) are less authoritative and are tagged accordingly. Several Block A quotes were checked against search snippets rather than full-page fetches.
- **Unverified Nobel claim:** A search snippet from Nature associates IceCube's founder Francis Halzen with a 2026 Nobel Prize in Physics.\[107\] This could not be independently confirmed here and was deliberately left out of the trivia rows.

## Sources

1. [Google's Equiano cable branch to Saint Helena activated - DCD](https://www.datacenterdynamics.com/en/news/googles-equiano-cable-branch-to-saint-helena-activated/)
2. [When .tk Became the World’s Biggest ccTLD—Free Domains Gone Wrong](https://dn.org/when-tk-became-the-worlds-biggest-cctld-free-domains-gone-wrong/)
3. [.nu Domain Registration. - .nu General Information - .nu Brand Protection - Niue domain registration.](https://bb-online.com/tldinformation/nu.shtml)
4. [The Kerguelen Archipelago is situated at 49°20'](https://scholarspace.manoa.hawaii.edu/server/api/core/bitstreams/a823af18-ce00-4532-87ce-b753f5f6e710/content)
5. [1 of 1 Interoperability reduces cost and risk at Svalbard Satellite Station](https://arc.aiaa.org/doi/pdf/10.2514/6.2004-348-188)
6. [History of the Atlantic Cable & Submarine Telegraphy - 1869 French Atlantic Cable](https://atlantic-cable.com/Article/1869French/index.htm)
7. [World’s largest neutrino observatory completed at South Pole](https://news.wisc.edu/worlds-largest-neutrino-observatory-completed-at-south-pole/)
8. [South Pole Telescope Readied for Operation - Sky & Telescope](https://skyandtelescope.org/astronomy-news/south-pole-telescope-readied-for-operation/)
9. [South Pole Telescope, Antarctica](https://www.cfa.harvard.edu/facilities-technology/telescopes-instruments/south-pole-telescope-antarctica)
10. [SpaceX Starlink internet service begins in Antarctica](https://www.space.com/spacex-starlink-internet-service-antarctica)
11. [American Samoa Broadband DOE March 28, 2022 Shovel Ready Projects](https://www.doi.gov/sites/doi.gov/files/4.a-astcaasg-american-samoa-infrastructure-broadband.pdf)
12. [Hawaiki cable comes into service](https://www.computerworld.com/article/1659228/hawaiki-cable-comes-into-service.html)
13. [Nobel physics prize awarded for detection of cosmic neutrinos](https://www.nature.com/articles/d41586-026-03092-1)
14. [South Pole Telescope achieves first light](https://phys.org/news/2007-02-south-pole-telescope.html)
15. [First M87 Event Horizon Telescope Results. II. Array and Instrumentation](https://arxiv.org/pdf/1906.11239)
16. [KSAT celebrating 15 years at Antarctic Troll station - KSAT - Kongsberg Satellite Services](https://www.ksat.no/news/news-archive/2022/celebrating-15-years-at-Troll-Station/)
17. [Troll Satellite Station](https://en.wikipedia.org/wiki/Troll_Satellite_Station)
18. [.IO Domain Registration - Buy IO Top Level Domain Now](https://www.atakdomain.com/en/domain-registration/british-indian-ocean-territory/io)
19. [graphsearch.epfl.ch](https://graphsearch.epfl.ch/concept/1113865)
20. [This article is more than 1 year old](https://www.theregister.com/2024/10/10/io_domain_uk_mauritius/)
21. [SSCS fibre cable landed at St Maarten](http://archive.saba-news.com/2013/12/16/sscs-fibre-cable-landed-st-maarten/)
22. [Completed sea cable benefits Saba, Statia](https://www.sxm-talks.com/the-daily-herald/completed-sea-cable-benefits-saba-statia/)
23. [Google Builds Giant AI Data Center On Christmas Island, Australia - Submarine Networks](https://www.submarinenetworks.com/en/nv/insights/google-builds-giant-ai-data-center-on-christmas-island,-australia)
24. [This article is more than 1 year old](https://www.theregister.com/2024/11/27/bosun_cable_darwin_christmas_island/)
25. [Google unveils plans for new subsea cable system](https://www.rcrwireless.com/20251118/network-infrastructure/google-subsea)
26. [Jump to Content](https://cloud.google.com/blog/products/networking/introducing-dhivaru-new-subsea-cable/)
27. [Google plans AI data center on Australian outpost Christmas Island - DCD](https://www.datacenterdynamics.com/en/news/google-plans-ai-data-center-on-australian-outpost-christmas-island/)
28. [New on Yahoo](https://tech.yahoo.com/ai/gemini/articles/google-build-data-center-christmas-170351814.html)
29. [Google's global data hub plan for Christmas Island gets mixed reviews from locals - ABC News](https://www.abc.net.au/news/2025-11-29/google-data-centre-stokes-uncertainty-on-christmas-island/105984092)
30. [.cc - ICANNWiki](https://icannwiki.org/.cc)
31. [Calls for Australia to reclaim Cocos (Keeling) Islands' internet domain, which has become a haven for child sex abuse - ABC News](https://www.abc.net.au/news/science/2021-06-08/how-cocos-keeling-domain-became-haven-child-sex-abuse-material/100191896)
32. [Authorities to remove child exploitation material from Cocos (Keeling) Islands .cc domain - ABC News](https://www.abc.net.au/news/2023-05-03/cocos-keeling-islands-internet-domain-child-sexual-abuse-website/101738256)
33. [FIRST EVER SUBMARINE CABLE LANDS IN THE COOK ISLANDS](https://maureen-hilyard.medium.com/first-ever-submarine-cable-lands-in-the-cook-islands-f5bf2237c8f2)
34. [Manatua One cable lands in Rarotonga](https://www.rnz.co.nz/news/pacific/407734/manatua-one-cable-lands-in-rarotonga)
35. [Page 1 of 18 MANATUA CONSORTIUM MEDIA RELEASE: \*\* APPROVED FOR RELEASE \*\*](https://www.subcom.com/documents/2020/Manatua_RFS_FINAL_22JULY2020.pdf)
36. [CTEX Becomes First Uptime Institute Certified, Multi-tenant, Tier-IV Data Center in Latin America and the Caribbean](https://www.prweb.com/releases/ctex_becomes_first_uptime_institute_certified_multi_tenant_tier_iv_data_center_in_latin_america_and_the_caribbean/prweb10896753.htm)
37. [CTEX Officially Opens the First of Four Uptime Institute Certified Tier-IV Datacenters](https://www.prweb.com/releases/ctex_officially_opens_the_first_of_four_uptime_institute_certified_tier_iv_datacenters/prweb11653112.htm)
38. [CTEX becomes Latin America and the Caribbean's first Multi-tenant Tier-IV datacenter certified for both Design and Constructed Facility by the Uptime Institute.](https://www.prweb.com/releases/ctex_becomes_latin_america_and_the_caribbean_s_first_multi_tenant_tier_iv_datacenter_certified_for_both_design_and_constructed_facility_by_the_uptime_institute_/prweb11731426.htm)
39. [1 Information Communication Technologies (ICT) Indicators 1. Introduction](https://www.itu.int/ITU-D/ict/botswana04/doc/doc/06_Eritrea_ICT_Indicators_e.pdf)
40. [Eritrean Telecommunications Corporation](https://en.wikipedia.org/wiki/Eritrean_Telecommunications_Corporation)
41. [Efforts Underway To Expand Internet Service](https://shabait.com/2010/11/19/efforts-underway-to-expand-internet-service/)
42. [Eri-TV](https://en.wikipedia.org/wiki/Eri-TV)
43. [ESA - CSG at 50: half a century of Europe's Spaceport](https://www.esa.int/About_Us/50_years_of_ESA/CSG_at_50_half_a_century_of_Europe_s_Spaceport)
44. [TLDs for French overseas collectivities French overseas Top-Level Domain names - Afnic](https://www.afnic.fr/en/products-and-services/french-overseas-cctlds/french-overseas-top-level-domains/)
45. [Stations - EPB](https://data.europeanpolarboard.org/stations/?no_cache=1&tx_infradatabase_stations%5Bcode%5D=CO1106&tx_infradatabase_stations%5Baction%5D=stationinfo&tx_infradatabase_stations%5Bcontroller%5D=Frontend&cHash=cc63c43af6aa599843510e2bee09b91a)
46. [GPS Kerguelen Islands](https://www.sonel.org/spip.php?page=gps&idStation=710)
47. [Kerguelen](https://regina.cnes.fr/en/stations/KERG)
48. [SCAR GSSG - Kerguelen Permanent GPS Observatory Site](https://www.geoscience.scar.org/geodesy/perm_ob/gps/kerguelen.htm)
49. [High-speed broadband submarine cable FLY-LION3 makes landfall in Mayotte - Newsroom Groupe Orange](https://newsroom.orange.com/high-speed-broadband-submarine-cable-fly-lion3-makes-landfall-in-mayotte/)
50. [LION (cable system)](<https://en.wikipedia.org/wiki/LION_(cable_system)>)
51. [History of MVO](https://www.mvo.ms/who-we-are/history-of-mvo/)
52. [capturing preserving and digitizing legacy seismic data montserrat volcano observatory](https://www.usgs.gov/publications/capturing-preserving-and-digitizing-legacy-seismic-data-montserrat-volcano-observatory)
53. [Capturing, preserving & digitizing legacy seismic data from the Soufriere Hills (Montserrat) 1995-2010 eruption - ADS](https://ui.adsabs.harvard.edu/abs/2019AGUFMIN23D0907T/abstract)
54. [pubs.usgs.gov](https://pubs.usgs.gov/publication/70260155)
55. [(PDF) The first seismo-volcanological observatory on Montserrat](https://www.researchgate.net/publication/382631787_The_first_seismo-volcanological_observatory_on_Montserrat)
56. [World's First WiFi Nation](https://www.lightreading.com/wifi/world-s-first-wifi-nation)
57. [.nu](https://en.wikipedia.org/wiki/.nu)
58. [Kwangmyong national intranet: an innovation from North Korea](https://superscout.co/innovation/kwangmyong-intranet)
59. [Kwangmyong (network)](<https://en.wikipedia.org/wiki/Kwangmyong_(network)>)
60. [Red Star OS](https://en.wikipedia.org/wiki/Red_Star_OS)
61. [Naenara (browser)](<https://en.wikipedia.org/wiki/Naenara_(browser)>)
62. [Red Star OS: North Korea's dystopian operating system](https://versus.com/en/news/red-star-os)
63. [NEC completes "ATISA" submarine cable: Press Releases](https://www.nec.com/en/press/201706/global_20170622_01.html)
64. [Submarine Cable Landing Licenses Granted](https://www.fcc.gov/submarine-cable-landing-licenses-granted)
65. [Telephone numbers in the Pitcairn Islands](https://en.wikipedia.org/wiki/Telephone_numbers_in_the_Pitcairn_Islands)
66. [One of the most isolated places on Earth finally gets high- ...](https://www.norfolkonlinenews.com/article/one-of-the-most-isolated-places-on-earth-finally-gets-high-speed-internet)
67. [Starlink high-speed internet comes to Pitcairn — Visit Pitcairn - Open To Explore](https://www.visitpitcairn.pn/the-pitkern-blog/one-of-the-most-isolated-places-on-earth-finally-gets-high-speed-internet)
68. [Pitcairn Island - Communications](https://www.noonsite.com/place/pitcairn-island/view/communications/)
69. [LANCEMENT OFFICIELDU CÂBLE SOUS MARIN ReuNION](https://parallelesud.com/lancement-officieldu-cable-sous-marin-reunion/)
70. [.bl - .bl General Information - Register .bl - St.Barthelemy Domains](https://www.bb-online.com/countryinformation/bl.shtml)
71. [.bl](https://en.wikipedia.org/wiki/.bl)
72. [Fibre Optic Cable Landed on St Helena](https://www.sainthelena.gov.sh/2021/news/fibre-optic-cable-landed-on-st-helena/)
73. [Fibre Optic Cable Project](https://www.sainthelena.gov.sh/portfolios/economic-development-portfolio/sustainable-development/fibre-optic-cable-project/)
74. [.mf](https://en.wikipedia.org/wiki/.mf)
75. [French Atlantic Cable Company](https://en.wikipedia.org/wiki/French_Atlantic_Cable_Company)
76. [1865 Admiralty Chart of St Pierre Island (Miquelon) w/ TransAtlantic Cable](https://www.geographicus.com/P/AntiqueMap/stpierre-admiralty-1861)
77. [History of Saint Pierre and Miquelon - Acadian Genealogy - Historical Acadian-Cajun Resources](https://www.acadian.org/history/history-saint-pierre-miquelon/)
78. [Nauset Light Beach - Cape Cod National Seashore (U.S. National Park Service)](https://www.nps.gov/caco/planyourvisit/nauset-light-beach.htm)
79. [Saint Pierre and Miquelon Satellite Station](https://en.wikipedia.org/wiki/Saint_Pierre_and_Miquelon_Satellite_Station)
80. [Minister Richardson observes landing of subsea SSCS telecommunications cable at SMITCOMS](https://pearlfmradio.sx/2013/12/16/minister-richardson-observes-landing-of-subsea-sscs-telecommunications-cable-at-smitcoms/)
81. [Svalbard Ground Station - Airport Technology](https://www.airport-technology.com/projects/svalbard/)
82. [Fibre optic cables](https://spacenorway.com/infrastructure/subsea-fibre-cables/fibre-optic-cables/)
83. [A Powerhouse of Global Satellite Infrastructure: Norway?](https://undark.org/2025/03/19/global-satellite-infrastructure-norway/)
84. [Svalbard Satellite Station](https://en.wikipedia.org/wiki/Svalbard_Satellite_Station)
85. [Zoom - Tokelau leads world in renewable energy](https://www.spc.int/updates/blog/2016/11/zoom-tokelau-leads-world-in-renewable-energy)
86. [An Island (Tokelau) Powered 100% by Solar Energy](https://seia.org/news/island-tokelau-powered-100-solar-energy/)
87. [.tk - ICANNWiki](https://icannwiki.org/.tk)
88. [.tk](https://en.wikipedia.org/wiki/.tk)
89. [From tiny atolls to digital dominance: the .tk story](https://www.dataprovider.com/blog/domains/the-tk-story/)
90. [The Pan Am Historical Foundation - Pan Am July 1935](https://www.panam.org/pan-am-jul-1935)
91. [Physics In History on X: "On July 9, 1962, the United States conducted Starfish Prime, a high-altitude nuclear test as part of Operation Fishbowl. A 1.4 megaton hydrogen bomb was detonated about 400 km (250 miles) above the Pacific Ocean near Johnston Atoll. The test aimed to study the effects of nuclear https://t.co/dpDh8XAWAv" / X](https://x.com/PhysInHistory/status/1942911025096921404)
92. [Why the U.S. once set off a nuclear bomb in space](https://www.nationalgeographic.com/premium/article/why-the-us-once-set-off-a-nuclear-bomb-in-space-called-starfish-prime)
93. [THE PAN AM DIRECTION FINDER BEARINGS](https://tighar.org/Projects/Earhart/Archives/Research/ResearchPapers/Brandenburg/RDFResearch/RDFAnalysis/DFpaper.pdf)
94. [Reproductions of Rare Vatican Manuscript to Be Presented to Project Donors: Media](https://www.nttdata.com/global/en/news/press-release/2016/july/2016/reproductions-of-rare-vatican-manuscript-to-be-presented-to-project-donors)
95. [Vatican's manuscripts digital archive now available online](https://phys.org/news/2014-10-vatican-manuscripts-digital-archive-online.html)
96. [Vatican’s Manuscripts Digital Archive Now Available Online - NTT DATA TR](http://tr.nttdata.com/news/news-detail//article/vaticans-manuscripts-digital-archive-now-available-online-1/index.html)
97. [Reproductions of Rare Vatican Manuscript to Be Presented to Project Donors Project Continues to Digitally Preserve Humankind's Cultural Heritage with Latest Technology](https://global.canon/en/news/2016/20160708.html)
98. [NTT and Vatican City: Digitally Preserving Global Heritage](https://www.global.ntt/insights-hub/connecting-past-present-and-future-in-partnership-with-vatican-city/)
99. [Completion Report Project Number: 47320-001 Grant Number: 0458 December 2021](https://www.adb.org/sites/default/files/project-documents/47320/47320-001-pcr-en.pdf)
100. [Thematic reports Maximising availability of international connectivity](https://www.itu.int/en/ITU-D/Regulatory-Market/Documents/Infrastructure_portal/Maximising-availability-of-int-connectivity-in-the-pacific.pdf)
101. [Tui Samoa Cable - The Connected Pacific - Confluence](https://telco2.atlassian.net/wiki/spaces/PACPUB/pages/140410928/Tui+Samoa+Cable)
102. [Wallis et Futuna - Settle](https://www.wallis-et-futuna.wf/en/setting)
103. [A VIP tour of Curaçao Technology Exchange N.V. (CTEX) - Curacao Business](https://cbm.cw/a-vip-tour-of-curacao-technology-exchange-n-v-ctex/)
104. [Niue: the myth of the “Wifi Nation” - Domain Incite](https://domainincite.com/4357-niue-the-myth-of-the-wifi-nation)
105. [Tiny Islands, Massive TLDs: How Tokelau, Tuvalu, and Niue Built Some of the Internet's Largest Domain Extensions - DomainsProject Blog](https://domainsproject.org/blog/tiny-islands-massive-tlds)
106. [Google Expands Subsea Cable Infrastructure with Data Center on Remote Australian Military Outpost - WinBuzzer](https://winbuzzer.com/2025/11/06/google-plans-strategic-ai-data-center-on-remote-australian-military-outpost-xcxwbn/)
107. [The discovery of cosmic neutrinos: Opening a new window into the universe](https://www.deccanherald.com/amp/story/science/space/the-discovery-of-cosmic-neutrinos-opening-a-new-window-into-the-universe-4185737)
