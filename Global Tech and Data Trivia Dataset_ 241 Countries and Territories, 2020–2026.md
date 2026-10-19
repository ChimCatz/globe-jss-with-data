# Global Tech & Data Trivia Dataset: 241 Countries and Territories, 2020–2026 Data

All 195 sovereign and observer states in scope have at least 2 sourced trivia items, and 192 of them have 3. Most of the 46 territories covered have at least one item, though many small ones fall short of 3. Full coverage of every country rests on three datasets that cover the whole world: ITU internet use (mostly 2024), the UN E-Government Development Index (2024), and Cable.co.uk mobile data prices (2023). Stronger headline items replace these where they exist: chips, crypto, data centres, domain-name income and cyber theft.

## TL;DR
- **Coverage:** 192 of the 195 states have 3 items; North Korea, Eritrea and Vatican City have 2. Every country uses data from 2020 or later. Most territories have 1–3 items because there is little official data on small dependencies (see the shortfall list).
- **Best headline trivia:** Nvidia's record revenue was $215.9B in fiscal 2026. SK hynix earned 97.15 trillion won in 2025. Anguilla's .ai domain brought in EC$105.5M (US$39M) in 2024, about 23% of the government budget, according to the IMF as reported by Gulf News. Chainalysis reports that North Korean hackers stole at least $2.02B in crypto in 2025, up 51% on 2024.
- **Use it this way:** the CSV below is the master file. Each row has a short source key that maps to a full URL in the Source Key table. A find-and-replace turns the keys into URLs, and the JSON schema below shows how to convert the CSV.

## Key Findings
- **Extremes make the best trivia.** Mobile data cost $0.02 per GB in Israel and $43.75 in Zimbabwe (2023).\[1\] Fixed broadband cost $2.40 a month in Sudan and $457.84 in the Solomon Islands (2024).\[2\]\[3\] Iceland had the fastest average broadband in 2024 at 279.55 Mbps.\[4\]
- **Small territories punch above their weight.** Jersey ranked 2nd in the world for broadband speed in 2024. Macau ranked 3rd.\[4\] Anguilla and Tuvalu earn a large share of public revenue from their .ai and .tv domains.\[5\]\[6\]
- **Several superlatives are close to ties.** Bahrain, the UAE, Saudi Arabia and Kuwait all report 100% internet use.\[7\] Denmark tops the UN e-government ranking.\[8\]

## Source Key (replace each key with its URL)
| Key | Source (publisher, data year) | URL |
|---|---|---|
| ITU | ITU "Individuals using the Internet" table, as compiled on Wikipedia | https://en.wikipedia.org/wiki/List_of_countries_by_number_of_Internet_users |
| EGDI | UN DESA E-Government Survey 2024 data centre | https://publicadministration.un.org/egovkb/en-us/data-center |
| MOB | Cable.co.uk / BestBroadbandDeals worldwide mobile data pricing 2023 (237 countries) | https://bestbroadbanddeals.co.uk/mobiles/worldwide-data-pricing/ |
| SPD | BestBroadbandDeals worldwide broadband speed league 2024 | https://bestbroadbanddeals.co.uk/broadband/speed/worldwide-speed-league/ |
| BBP | BestBroadbandDeals global broadband pricing league 2024 | https://bestbroadbanddeals.co.uk/broadband/pricing/worldwide-comparison/ |
| BG26 | Broadband Genie 2026 Global Broadband Price League, as reported by ISPreview | https://www.ispreview.co.uk/index.php/2026/04/study-ranks-uk-70th-out-of-214-countries-for-cheapest-broadband-plans.html |
| VC26 | Visual Capitalist, most expensive internet 2026 (Broadband Genie data) | https://www.visualcapitalist.com/ranked-the-worlds-most-and-least-expensive-internet/ |
| GCI | ITU Global Cybersecurity Index 2024 | https://www.itu.int/en/ITU-D/Cybersecurity/Documents/GCIv5/2401416_1b_Global-Cybersecurity-Index-E.pdf |
| CHA | Chainalysis 2025 Global Crypto Adoption Index | https://www.chainalysis.com/blog/2025-global-crypto-adoption-index/ |
| DPRK | Chainalysis, 2025 crypto theft | https://www.chainalysis.com/blog/crypto-hacking-stolen-funds-2026/ |
| NVDA | NVIDIA 8-K, Q4/FY2026 results | https://www.sec.gov/Archives/edgar/data/1045810/000104581026000019/q4fy26pr.htm |
| TSMC | TSMC 6-K, December 2025 revenue report | https://www.sec.gov/Archives/edgar/data/1046179/000104617926000005/tsm-revenue20260109.htm |
| ASML | ASML 2025 Annual Report, financials | https://investor.asml.com/annual-reports/2025/financials |
| SKH | SK hynix FY25 results | https://news.skhynix.com/en/sk-hynix-announces-fy25-financial-results/ |
| UPI | India PIB, UPI 10 years | https://www.pib.gov.in/PressReleasePage.aspx?PRID=2257087&reg=48&lang=2 |
| CSO | Ireland CSO, Business in Ireland 2025 – Energy | https://www.cso.ie/en/releasesandpublications/ep/p-biieeue/businessinireland2025-emissionsandenergyusebyenterprises/energy/ |
| IMF-AI | IMF, "An AI-Powered Boost to Anguilla's Revenues" | https://www.imf.org/en/news/articles/2024/05/15/cf-an-ai-powered-boost-to-anguillas-revenues |
| AI24 | CO/AI news, Anguilla .ai revenue 2024 | https://getcoai.com/news/anguilla-earns-39m-from-ai-domain-sales-in-2024-boom/ |
| TV | The World (PRX), Tuvalu .tv deal | https://theworld.org/stories/2022/01/24/tuvalu-cashes-coveted-internet-domain-twitch-tv |
| OECD-K | OECD Western Balkans Competitiveness Outlook 2024: Kosovo | https://www.oecd.org/en/publications/western-balkans-competitiveness-outlook-2024-kosovo_ff74ae0e-en/full-report/component-15.html |
| OECD-K2 | OECD Kosovo economy profile presentation, 2024 | https://www.oecd.org/content/dam/oecd/en/events/2024/10/grc_kosovo/Kosovo-Economy-Profile-PPT.pdf |
| PCBS | Palestinian Central Bureau of Statistics, ICT press release | https://pcbs.gov.ps/post.aspx?ItemID=4510&amp=&lang=en |
| TUS | Submarine Networks, Tusass Connect | https://www.submarinenetworks.com/en/systems/intra-europe/tusass-connect |
| GIB | NEXT.io, Gibraltar gambling tax | https://next.io/news/people/gibraltar-warns-of-damaged-economy-amid-gambling-tax-hike/ |
| SPD20 | Malay Mail / AFP, Cable 2020 speed league | https://malaymail.com/news/tech-gadgets/2020/09/04/top-10-countries-with-the-fastest-broadband-speeds/1900006 |
| STA23 | Statista, Cable 2023 speed league | https://statista.com/chart/amp/7246/the-countries-with-the-fastest-internet |
| BEAD | StateScoop, BEAD allocations | https://statescoop.com/heres-how-much-every-state-is-getting-from-bead-grant-program/ |
| IOM | Isle of Man Government, National Income 2023/24 | https://www.gov.im/media/1391286/national-income-2023-24-report-updated-jan-26.pdf |
| IOM22 | Isle of Man Government, National Income 2021/22 | https://www.gov.im/media/1382559/2021_2022-national-income-report.pdf |
| SURE | Sure, Guernsey fibre | https://www.sure.com/guernsey/about-us/guernsey-fibre/ |
| ITV | ITV News, Guernsey 2Gbps | https://www.itv.com/news/channel/2023-10-25/guernsey-broadband-to-be-twice-as-fast-as-jersey |
| FLK | ISPreview, Falklands Starlink licence | https://www.ispreview.co.uk/index.php/2025/11/falkland-islands-government-grants-licence-for-starlink-satellite-broadband.html |
| SAM | Samoa Observer, Starlink licence | https://www.samoaobserver.ws/category/samoa/112692 |
| DCD-PF | DatacenterDynamics, Natitua Sud cable | https://www.datacenterdynamics.com/en/news/natituasud-subsea-cable-lands-at-toahotu-bay-french-polynesia/ |
| DCD-HO | DatacenterDynamics, Honomoana cable | https://www.datacenterdynamics.com/en/news/google-announces-two-transpacific-cables-connecting-us-to-australia/ |

## Dataset (CSV: country, trivia_number, trivia, tag, source)
```csv
country,trivia_number,trivia,tag,source
Afghanistan,1,"Only 16.1% of people used the internet in 2024",International Org,ITU
Afghanistan,2,"Ranked 188th of 193 in the UN E-Government Index 2024",International Org,EGDI
Afghanistan,3,"1GB of mobile data cost $1.02 on average in 2023",Research/Report,MOB
Albania,1,"85.9% of people used the internet in 2024",International Org,ITU
Albania,2,"Ranked 62nd of 193 in UN e-government in 2024",International Org,EGDI
Albania,3,"1GB of mobile data cost $1.55 in 2023",Research/Report,MOB
Algeria,1,"77.4% of people used the internet in 2024",International Org,ITU
Algeria,2,"Ranked 116th in UN e-government in 2024",International Org,EGDI
Algeria,3,"1GB of mobile data cost $0.73 in 2023",Research/Report,MOB
American Samoa,1,"1GB of mobile data cost $1.50 in 2023",Research/Report,MOB
American Samoa,2,"Allocated $37.56M in US BEAD broadband funding in 2023",News Media,BEAD
Andorra,1,"94.4% of people used the internet in 2024",International Org,ITU
Andorra,2,"Ranked 88th in UN e-government in 2024",International Org,EGDI
Andorra,3,"1GB of mobile data cost $4.82 in 2023",Research/Report,MOB
Angola,1,"40.7% of people used the internet in 2024",International Org,ITU
Angola,2,"Ranked 156th in UN e-government in 2024",International Org,EGDI
Angola,3,"1GB of mobile data cost $1.01 in 2023",Research/Report,MOB
Anguilla,1,".ai domain sales earned EC$87M (~US$32M) in 2023, just over 20% of government revenue",International Org,IMF-AI
Anguilla,2,".ai domains earned EC$105.5M (US$39M) in 2024, about 23% of the government budget (IMF figures reported by Gulf News)",News Media,AI24
Anguilla,3,"1GB of mobile data cost $1.88 in 2023",Research/Report,MOB
Antigua and Barbuda,1,"72.7% of people used the internet in 2024",International Org,ITU
Antigua and Barbuda,2,"Ranked 105th in UN e-government in 2024",International Org,EGDI
Antigua and Barbuda,3,"1GB of mobile data cost $3.20 in 2023",Research/Report,MOB
Argentina,1,"89.7% of people used the internet in 2024",International Org,ITU
Argentina,2,"Ranked 20th in Chainalysis' 2025 crypto adoption index",Research/Report,CHA
Argentina,3,"Had the world's 2nd-cheapest broadband in 2024 at $5.17/month",Research/Report,BBP
Armenia,1,"83.4% of people used the internet in 2024",International Org,ITU
Armenia,2,"Ranked 48th in UN e-government in 2024",International Org,EGDI
Armenia,3,"Ranked 14th for crypto adoption per person in 2025",Research/Report,CHA
Aruba,1,"1GB of mobile data cost $1.85 in 2023",Research/Report,MOB
Australia,1,"96.1% of people used the internet in 2024",International Org,ITU
Australia,2,"Ranked 8th of 193 in UN e-government in 2024",International Org,EGDI
Australia,3,"Placed in Tier 1 ('role-modelling') of the ITU Global Cybersecurity Index 2024",International Org,GCI
Austria,1,"91.9% of people used the internet in 2025",International Org,ITU
Austria,2,"Ranked 22nd in UN e-government in 2024",International Org,EGDI
Austria,3,"1GB of mobile data cost just $0.51 in 2023",Research/Report,MOB
Azerbaijan,1,"90.8% of people used the internet in 2026",International Org,ITU
Azerbaijan,2,"Ranked 74th in UN e-government in 2024",International Org,EGDI
Azerbaijan,3,"1GB of mobile data cost $1.76 in 2023",Research/Report,MOB
Bahamas,1,"92.5% of people used the internet in 2024",International Org,ITU
Bahamas,2,"Ranked 83rd in UN e-government in 2024",International Org,EGDI
Bahamas,3,"1GB of mobile data cost $4.99 in 2023",Research/Report,MOB
Bahrain,1,"100% of people used the internet in 2024",International Org,ITU
Bahrain,2,"Ranked 18th in UN e-government in 2024",International Org,EGDI
Bahrain,3,"Tier 1 in the ITU Global Cybersecurity Index 2024",International Org,GCI
Bangladesh,1,"53.4% of people used the internet in 2024",International Org,ITU
Bangladesh,2,"Ranked 13th in Chainalysis' 2025 crypto adoption index",Research/Report,CHA
Bangladesh,3,"Tier 1 in the ITU Global Cybersecurity Index 2024",International Org,GCI
Barbados,1,"70.4% of people used the internet in 2024",International Org,ITU
Barbados,2,"Ranked 91st in UN e-government in 2024",International Org,EGDI
Barbados,3,"Averaged 97.27 Mbps broadband in 2024, 44th in the world",Research/Report,SPD
Belarus,1,"95.5% of people used the internet in 2025",International Org,ITU
Belarus,2,"Had the world's 3rd-cheapest broadband in 2024 at $7.03/month",Research/Report,BBP
Belarus,3,"Ranked 17th for crypto adoption per person in 2025",Research/Report,CHA
Belgium,1,"95.8% of people used the internet in 2024",International Org,ITU
Belgium,2,"Ranked 56th in UN e-government in 2024",International Org,EGDI
Belgium,3,"Tier 1 in the ITU Global Cybersecurity Index 2024",International Org,GCI
Belize,1,"80% of people used the internet in 2024",International Org,ITU
Belize,2,"Ranked 141st in UN e-government in 2024",International Org,EGDI
Belize,3,"Most expensive mobile data in Central America in 2023 at $2.92/GB",Research/Report,MOB
Benin,1,"34% of people used the internet in 2024",International Org,ITU
Benin,2,"Ranked 146th in UN e-government in 2024",International Org,EGDI
Benin,3,"1GB of mobile data cost $2.37 in 2023",Research/Report,MOB
Bermuda,1,"Most expensive broadband in North America in 2024 at $185/month",Research/Report,BBP
Bermuda,2,"Averaged 107.40 Mbps broadband in 2024, 37th in the world",Research/Report,SPD
Bermuda,3,"Cheapest mobile data in North America in 2023 at $3.42/GB",Research/Report,MOB
Bhutan,1,"91.3% of people used the internet in 2024",International Org,ITU
Bhutan,2,"Ranked 103rd in UN e-government in 2024",International Org,EGDI
Bhutan,3,"Broadband averaged $117.75/month in 2024, among Asia's priciest",Research/Report,BBP
Bolivia,1,"79.7% of people used the internet in 2024",International Org,ITU
Bolivia,2,"Ranked 99th in UN e-government in 2024",International Org,EGDI
Bolivia,3,"Averaged 16.00 Mbps broadband in 2024, 148th in the world",Research/Report,SPD
Bosnia and Herzegovina,1,"86.1% of people used the internet in 2024",International Org,ITU
Bosnia and Herzegovina,2,"Ranked 107th in UN e-government in 2024",International Org,EGDI
Bosnia and Herzegovina,3,"1GB of mobile data cost $1.03 in 2023",Research/Report,MOB
Botswana,1,"57.5% of people used the internet in 2024",International Org,ITU
Botswana,2,"Ranked 112th in UN e-government in 2024",International Org,EGDI
Botswana,3,"1GB of mobile data cost $1.99 in 2023",Research/Report,MOB
Brazil,1,"84.5% of people used the internet in 2024",International Org,ITU
Brazil,2,"Ranked 5th in Chainalysis' 2025 crypto adoption index",Research/Report,CHA
Brazil,3,"Ranked 50th in UN e-government in 2024",International Org,EGDI
British Indian Ocean Territory,1,"Slowest broadband in the world in 2024 at 2.38 Mbps",Research/Report,SPD
British Indian Ocean Territory,2,"Broadband averaged $167.33/month in 2024",Research/Report,BBP
British Indian Ocean Territory,3,"1GB of mobile data cost $4.44 in 2023",Research/Report,MOB
British Virgin Islands,1,"Broadband averaged $189/month in 2024, 4th most expensive in the world",Research/Report,BBP
British Virgin Islands,2,"Broadband averaged $155/month in 2026",Research/Report,VC26
British Virgin Islands,3,"1GB of mobile data cost $5.24 in 2023",Research/Report,MOB
Brunei,1,"96.3% of people used the internet in 2024",International Org,ITU
Brunei,2,"Ranked 75th in UN e-government in 2024",International Org,EGDI
Brunei,3,"1GB of mobile data cost $1.89 in 2023",Research/Report,MOB
Bulgaria,1,"82.4% of people used the internet in 2025",International Org,ITU
Bulgaria,2,"Ranked 55th in UN e-government in 2024",International Org,EGDI
Bulgaria,3,"Broadband averaged $10.47/month in 2024, 14th cheapest in the world",Research/Report,BBP
Burkina Faso,1,"28.3% of people used the internet in 2024",International Org,ITU
Burkina Faso,2,"Ranked 175th in UN e-government in 2024",International Org,EGDI
Burkina Faso,3,"1GB of mobile data cost $3.27 in 2023",Research/Report,MOB
Burundi,1,"Just 8.6% of people used the internet in 2024",International Org,ITU
Burundi,2,"Ranked 183rd in UN e-government in 2024",International Org,EGDI
Burundi,3,"2nd most expensive broadband in the world in 2024 at $304.57/month",Research/Report,BBP
Cabo Verde,1,"74.7% of people used the internet in 2024",International Org,ITU
Cabo Verde,2,"Ranked 111th in UN e-government in 2024",International Org,EGDI
Cabo Verde,3,"1GB of mobile data cost $3.24 in 2023",Research/Report,MOB
Cambodia,1,"68.5% of people used the internet in 2024",International Org,ITU
Cambodia,2,"5th-cheapest mobile data in the world in 2023 at $0.12/GB",Research/Report,MOB
Cambodia,3,"Ranked 13th for crypto adoption per person in 2025",Research/Report,CHA
Cameroon,1,"46.3% of people used the internet in 2024",International Org,ITU
Cameroon,2,"Ranked 155th in UN e-government in 2024",International Org,EGDI
Cameroon,3,"1GB of mobile data cost $1.63 in 2023",Research/Report,MOB
Canada,1,"94.4% of people used the internet in 2024",International Org,ITU
Canada,2,"Averaged 152.25 Mbps broadband in 2024, 17th in the world",Research/Report,SPD
Canada,3,"Ranked 47th in UN e-government in 2024",International Org,EGDI
Caribbean Netherlands,1,"1GB of mobile data cost $2.71 in 2023",Research/Report,MOB
Cayman Islands,1,"Most expensive mobile data in the Caribbean in 2023 at $8.39/GB",Research/Report,MOB
Cayman Islands,2,"Fastest broadband in the Caribbean in 2024 at 118.83 Mbps (29th in the world)",Research/Report,SPD
Cayman Islands,3,"Broadband averaged $155.04/month in 2024",Research/Report,BBP
Central African Republic,1,"13.8% of people used the internet in 2024",International Org,ITU
Central African Republic,2,"Ranked last (193rd) in UN e-government in 2024",International Org,EGDI
Central African Republic,3,"1GB of mobile data cost $10.90 in 2023",Research/Report,MOB
Chad,1,"12.6% of people used the internet in 2024",International Org,ITU
Chad,2,"Ranked 189th in UN e-government in 2024",International Org,EGDI
Chad,3,"1GB of mobile data cost $4.09 in 2023",Research/Report,MOB
Chile,1,"95.6% of people used the internet in 2024",International Org,ITU
Chile,2,"Ranked 31st in UN e-government in 2024",International Org,EGDI
Chile,3,"1GB of mobile data cost $0.64 in 2023",Research/Report,MOB
China,1,"91.6% of people used the internet in 2025",International Org,ITU
China,2,"Ranked 35th in UN e-government in 2024",International Org,EGDI
China,3,"1GB of mobile data cost $0.38 in 2023",Research/Report,MOB
Christmas Island,1,"Broadband averaged $141.85/month in 2024",Research/Report,BBP
Cocos (Keeling) Islands,1,"1GB of mobile data cost $3.03 in 2023",Research/Report,MOB
Colombia,1,"79.3% of people used the internet in 2024",International Org,ITU
Colombia,2,"Ranked 68th in UN e-government in 2024",International Org,EGDI
Colombia,3,"Cheapest mobile data in South America in 2023 at $0.20/GB",Research/Report,MOB
Comoros,1,"32.5% of people used the internet in 2024",International Org,ITU
Comoros,2,"Ranked 180th in UN e-government in 2024",International Org,EGDI
Comoros,3,"1GB of mobile data cost $2.18 in 2023",Research/Report,MOB
Congo,1,"47.3% of people used the internet in 2024",International Org,ITU
Congo,2,"Ranked 166th in UN e-government in 2024",International Org,EGDI
Congo,3,"1GB of mobile data cost $0.68 in 2023",Research/Report,MOB
Cook Islands,1,"1GB of mobile data cost $2.62 in 2023",Research/Report,MOB
Costa Rica,1,"87.4% of people used the internet in 2024",International Org,ITU
Costa Rica,2,"Ranked 61st in UN e-government in 2024",International Org,EGDI
Costa Rica,3,"Averaged 53.39 Mbps broadband in 2024",Research/Report,SPD
Côte d'Ivoire,1,"41.4% of people used the internet in 2024",International Org,ITU
Côte d'Ivoire,2,"Ranked 124th in UN e-government in 2024",International Org,EGDI
Côte d'Ivoire,3,"1GB of mobile data cost $1.18 in 2023",Research/Report,MOB
Croatia,1,"83.6% of people used the internet in 2024",International Org,ITU
Croatia,2,"Ranked 32nd in UN e-government in 2024",International Org,EGDI
Croatia,3,"1GB of mobile data cost $1.19 in 2023",Research/Report,MOB
Cuba,1,"70.5% of people used the internet in 2024",International Org,ITU
Cuba,2,"Slowest broadband in the Caribbean in 2024 at 4.49 Mbps",Research/Report,SPD
Cuba,3,"Ranked 139th in UN e-government in 2024",International Org,EGDI
Curaçao,1,"1GB of mobile data cost $2.68 in 2023",Research/Report,MOB
Curaçao,2,"Broadband averaged $121.96/month in 2026, 15th most expensive",Research/Report,VC26
Cyprus,1,"89.6% of people used the internet in 2024",International Org,ITU
Cyprus,2,"Ranked 38th in UN e-government in 2024",International Org,EGDI
Cyprus,3,"Tier 1 in the ITU Global Cybersecurity Index 2024",International Org,GCI
Czech Republic,1,"87.7% of people used the internet in 2024",International Org,ITU
Czech Republic,2,"Ranked 54th in UN e-government in 2024",International Org,EGDI
Czech Republic,3,"Most expensive mobile data in Eastern Europe in 2023 at $3.12/GB",Research/Report,MOB
DR Congo,1,"19.7% of people used the internet in 2024",International Org,ITU
DR Congo,2,"Ranked 179th in UN e-government in 2024",International Org,EGDI
DR Congo,3,"Broadband averaged $170.97/month in 2024",Research/Report,BBP
Denmark,1,"Ranked No. 1 of 193 in UN e-government in 2024",International Org,EGDI
Denmark,2,"99.8% of people used the internet in 2024",International Org,ITU
Denmark,3,"5th-fastest broadband in the world in 2024 at 210.51 Mbps",Research/Report,SPD
Djibouti,1,"65.3% of people used the internet in 2024",International Org,ITU
Djibouti,2,"Ranked 174th in UN e-government in 2024",International Org,EGDI
Djibouti,3,"1GB of mobile data cost $1.26 in 2023",Research/Report,MOB
Dominica,1,"82% of people used the internet in 2024",International Org,ITU
Dominica,2,"Ranked 127th in UN e-government in 2024",International Org,EGDI
Dominica,3,"1GB of mobile data cost $1.11 in 2023",Research/Report,MOB
Dominican Republic,1,"91% of people used the internet in 2024",International Org,ITU
Dominican Republic,2,"Ranked 85th in UN e-government in 2024",International Org,EGDI
Dominican Republic,3,"1GB of mobile data cost $0.79 in 2023",Research/Report,MOB
Ecuador,1,"77.2% of people used the internet in 2024",International Org,ITU
Ecuador,2,"Ranked 67th in UN e-government in 2024",International Org,EGDI
Ecuador,3,"1GB of mobile data cost $1.00 in 2023",Research/Report,MOB
Egypt,1,"74.6% of people used the internet in 2024",International Org,ITU
Egypt,2,"Had the 5th-cheapest broadband in the world in 2024 at $8.31/month",Research/Report,BBP
Egypt,3,"Tier 1 in the ITU Global Cybersecurity Index 2024",International Org,GCI
El Salvador,1,"66.5% of people used the internet in 2024",International Org,ITU
El Salvador,2,"Ranked 115th in UN e-government in 2024",International Org,EGDI
El Salvador,3,"1GB of mobile data cost $1.08 in 2023",Research/Report,MOB
Equatorial Guinea,1,"63.3% of people used the internet in 2024",International Org,ITU
Equatorial Guinea,2,"Ranked 176th in UN e-government in 2024",International Org,EGDI
Equatorial Guinea,3,"1GB of mobile data cost $1.59 in 2023",Research/Report,MOB
Eritrea,1,"14.3% of people used the internet in 2020",International Org,ITU\[9\]
Eritrea,2,"Ranked 190th of 193 in UN e-government in 2024",International Org,EGDI
Estonia,1,"Ranked 2nd of 193 in UN e-government in 2024",International Org,EGDI
Estonia,2,"92.2% of people used the internet in 2024",International Org,ITU
Estonia,3,"Ranked 11th for crypto adoption per person in 2025",Research/Report,CHA
Eswatini,1,"63.4% of people used the internet in 2024",International Org,ITU
Eswatini,2,"Ranked 113th in UN e-government in 2024",International Org,EGDI
Eswatini,3,"Averaged 37.23 Mbps broadband in 2024, among Sub-Saharan Africa's fastest",Research/Report,SPD
Ethiopia,1,"21.4% of people used the internet in 2024",International Org,ITU
Ethiopia,2,"Ranked 12th in Chainalysis' 2025 crypto adoption index",Research/Report,CHA
Ethiopia,3,"Ranked 169th in UN e-government in 2024",International Org,EGDI
Falkland Islands,1,"2nd most expensive mobile data in the world in 2023 at $40.58/GB",Research/Report,MOB
Falkland Islands,2,"Broadband averaged $139.74/month in 2024",Research/Report,BBP
Falkland Islands,3,"The government licensed Starlink satellite broadband in November 2025",News Media,FLK
Faroe Islands,1,"Most expensive broadband in Western Europe in 2024 at $83.86/month",Research/Report,BBP
Faroe Islands,2,"Averaged 56.61 Mbps broadband in 2024",Research/Report,SPD
Faroe Islands,3,"1GB of mobile data cost $2.24 in 2023",Research/Report,MOB
Fiji,1,"74.7% of people used the internet in 2024",International Org,ITU
Fiji,2,"3rd-cheapest mobile data in the world in 2023 at $0.09/GB",Research/Report,MOB
Fiji,3,"Ranked 93rd in UN e-government in 2024",International Org,EGDI
Finland,1,"94.1% of people used the internet in 2025",International Org,ITU
Finland,2,"Ranked 9th in UN e-government in 2024",International Org,EGDI
Finland,3,"Ranked 16th for crypto adoption per person in 2025",Research/Report,CHA
France,1,"88.7% of people used the internet in 2024",International Org,ITU
France,2,"9th-cheapest mobile data in the world in 2023 at $0.20/GB",Research/Report,MOB
France,3,"Ranked 34th in UN e-government in 2024",International Org,EGDI
French Guiana,1,"1GB of mobile data cost $0.49 in 2023",Research/Report,MOB
French Guiana,2,"Broadband averaged $53.84/month in 2024",Research/Report,BBP
French Polynesia,1,"1GB of mobile data cost $0.75 in 2023",Research/Report,MOB
French Polynesia,2,"The Natitua Sud subsea cable landed at Toahotu Bay in 2023",News Media,DCD-PF
French Polynesia,3,"Google announced the Honomoana subsea cable to French Polynesia in 2023",News Media,DCD-HO
Gabon,1,"68.7% of people used the internet in 2024",International Org,ITU
Gabon,2,"Ranked 121st in UN e-government in 2024",International Org,EGDI
Gabon,3,"1GB of mobile data cost $4.09 in 2023",Research/Report,MOB
Gambia,1,"49.5% of people used the internet in 2024",International Org,ITU
Gambia,2,"Ranked 181st in UN e-government in 2024",International Org,EGDI
Gambia,3,"1GB of mobile data cost $3.56 in 2023",Research/Report,MOB
Georgia,1,"83.8% of people used the internet in 2024",International Org,ITU
Georgia,2,"Ranked 3rd for crypto adoption per person in 2025",Research/Report,CHA
Georgia,3,"Ranked 69th in UN e-government in 2024",International Org,EGDI
Germany,1,"93.5% of people used the internet in 2024",International Org,ITU
Germany,2,"Ranked 12th in UN e-government in 2024",International Org,EGDI
Germany,3,"Tier 1 in the ITU Global Cybersecurity Index 2024",International Org,GCI
Ghana,1,"72.2% of people used the internet in 2024",International Org,ITU
Ghana,2,"Tier 1 in the ITU Global Cybersecurity Index 2024",International Org,GCI
Ghana,3,"1GB of mobile data cost $0.40 in 2023",Research/Report,MOB
Gibraltar,1,"Minister Nigel Feetham told Parliament in Dec 2025 that online gambling is about 30% of GDP, employs 3,400+ people and brings in around a third of tax receipts",Government/Official,GIB
Gibraltar,2,"Had the 4th-fastest broadband in the world in 2020",News Media,SPD20
Gibraltar,3,"1GB of mobile data cost $0.67 in 2023",Research/Report,MOB
Greece,1,"86.3% of people used the internet in 2024",International Org,ITU
Greece,2,"Ranked 36th in UN e-government in 2024",International Org,EGDI
Greece,3,"1GB of mobile data cost $2.79 in 2023",Research/Report,MOB
Greenland,1,"The Tusass Connect subsea cable is budgeted at €125.3M, with €20.6M in EU funding (2024)",News Media,TUS
Greenland,2,"Slowest broadband in North America in 2024 at 42.69 Mbps",Research/Report,SPD
Greenland,3,"Broadband averaged $114.60/month in 2024",Research/Report,BBP
Grenada,1,"70.2% of people used the internet in 2024",International Org,ITU
Grenada,2,"Ranked 104th in UN e-government in 2024",International Org,EGDI
Grenada,3,"1GB of mobile data cost $1.81 in 2023",Research/Report,MOB
Guadeloupe,1,"1GB of mobile data cost $0.49 in 2023",Research/Report,MOB
Guam,1,"Allocated $156.8M in US BEAD broadband funding in 2023",News Media,BEAD
Guam,2,"Broadband averaged $135/month in 2024",Research/Report,BBP
Guam,3,"1GB of mobile data cost $2.50 in 2023",Research/Report,MOB
Guatemala,1,"60.2% of people used the internet in 2024",International Org,ITU
Guatemala,2,"Ranked 122nd in UN e-government in 2024",International Org,EGDI
Guatemala,3,"1GB of mobile data cost $1.17 in 2023",Research/Report,MOB
Guernsey,1,"A £37.5M island-wide fibre rollout to ~30,000 properties began in 2022",Company-Marketed,SURE
Guernsey,2,"2Gbps symmetrical broadband went on sale in November 2023",News Media,ITV
Guernsey,3,"1GB of mobile data cost $1.69 in 2023",Research/Report,MOB
Guinea,1,"33.3% of people used the internet in 2024",International Org,ITU
Guinea,2,"Ranked 160th in UN e-government in 2024",International Org,EGDI
Guinea,3,"1GB of mobile data cost $1.51 in 2023",Research/Report,MOB
Guinea-Bissau,1,"29.8% of people used the internet in 2024",International Org,ITU
Guinea-Bissau,2,"Ranked 170th in UN e-government in 2024",International Org,EGDI
Guinea-Bissau,3,"1GB of mobile data cost $2.72 in 2023",Research/Report,MOB
Guyana,1,"83% of people used the internet in 2024",International Org,ITU
Guyana,2,"Ranked 128th in UN e-government in 2024",International Org,EGDI
Guyana,3,"1GB of mobile data cost $2.36 in 2023",Research/Report,MOB
Haiti,1,"47.9% of people used the internet in 2024",International Org,ITU
Haiti,2,"Cheapest mobile data in the Caribbean in 2023 at $0.22/GB",Research/Report,MOB
Haiti,3,"Ranked 186th in UN e-government in 2024",International Org,EGDI
Honduras,1,"58.6% of people used the internet in 2024",International Org,ITU
Honduras,2,"Ranked 142nd in UN e-government in 2024",International Org,EGDI
Honduras,3,"1GB of mobile data cost $0.78 in 2023",Research/Report,MOB
Hong Kong,1,"95.8% of people used the internet in 2024",International Org,ITU
Hong Kong,2,"Ranked 5th for crypto adoption per person in 2025",Research/Report,CHA
Hong Kong,3,"1GB of mobile data cost $0.82 in 2023",Research/Report,MOB
Hungary,1,"93.8% of people used the internet in 2024",International Org,ITU
Hungary,2,"Averaged 112.15 Mbps broadband in 2024",Research/Report,SPD
Hungary,3,"Ranked 59th in UN e-government in 2024",International Org,EGDI
Iceland,1,"Fastest broadband in the world in 2024 at 279.55 Mbps",Research/Report,SPD
Iceland,2,"98.2% of people used the internet in 2024",International Org,ITU
Iceland,3,"Ranked 5th in UN e-government in 2024",International Org,EGDI
India,1,"UPI handled 24,162 crore payments worth ₹314 lakh crore in FY2025-26",Government/Official,UPI\[10\]
India,2,"Ranked No. 1 in Chainalysis' 2025 crypto adoption index",Research/Report,CHA
India,3,"70% of people used the internet in 2025",International Org,ITU
Indonesia,1,"72.8% of people used the internet in 2024",International Org,ITU
Indonesia,2,"Ranked 7th in Chainalysis' 2025 crypto adoption index",Research/Report,CHA
Indonesia,3,"Tier 1 in the ITU Global Cybersecurity Index 2024",International Org,GCI
Iran,1,"85.3% of people used the internet in 2024",International Org,ITU
Iran,2,"Cheapest fixed broadband in the world in 2026 at $2.61/month",Research/Report,BG26
Iran,3,"Ranked 101st in UN e-government in 2024",International Org,EGDI
Iraq,1,"81.5% of people used the internet in 2024",International Org,ITU
Iraq,2,"Ranked 148th in UN e-government in 2024",International Org,EGDI
Iraq,3,"1GB of mobile data cost $1.07 in 2023",Research/Report,MOB
Ireland,1,"Data centres used 6,969 GWh in 2024, up 10% on 2023 and 22% of all metered electricity (5% in 2015), per the CSO",Government/Official,CSO
Ireland,2,"97.2% of people used the internet in 2024",International Org,ITU
Ireland,3,"Ranked 20th in UN e-government in 2024",International Org,EGDI
Isle of Man,1,"eGaming was 14.2% of the economy (£800.9M) in 2023/24",Government/Official,IOM
Isle of Man,2,"eGaming was 15.7% of the economy in 2021/22",Government/Official,IOM22
Isle of Man,3,"1GB of mobile data cost $1.44 in 2023",Research/Report,MOB
Israel,1,"Cheapest mobile data in the world in 2023 at $0.02/GB",Research/Report,MOB
Israel,2,"88.2% of people used the internet in 2024",International Org,ITU
Israel,3,"Fastest broadband in the Near East in 2024 at 153.61 Mbps",Research/Report,SPD
Italy,1,"2nd-cheapest mobile data in the world in 2023 at $0.09/GB",Research/Report,MOB
Italy,2,"89.2% of people used the internet in 2024",International Org,ITU
Italy,3,"Tier 1 in the ITU Global Cybersecurity Index 2024",International Org,GCI
Jamaica,1,"90.1% of people used the internet in 2024",International Org,ITU
Jamaica,2,"Ranked 96th in UN e-government in 2024",International Org,EGDI
Jamaica,3,"1GB of mobile data cost $0.70 in 2023",Research/Report,MOB
Japan,1,"85.5% of people used the internet in 2024",International Org,ITU
Japan,2,"Ranked 19th in Chainalysis' 2025 crypto adoption index",Research/Report,CHA
Japan,3,"Ranked 13th in UN e-government in 2024",International Org,EGDI
Jersey,1,"2nd-fastest broadband in the world in 2024 at 273.51 Mbps",Research/Report,SPD
Jersey,2,"Fastest broadband of all places measured in 2023 at 264.52 Mbps",Research/Report,STA23
Jersey,3,"1GB of mobile data cost $1.31 in 2023",Research/Report,MOB
Jordan,1,"95.6% of people used the internet in 2024",International Org,ITU
Jordan,2,"Ranked 4th for crypto adoption per person in 2025",Research/Report,CHA
Jordan,3,"Tier 1 in the ITU Global Cybersecurity Index 2024",International Org,GCI
Kazakhstan,1,"93.4% of people used the internet in 2024",International Org,ITU
Kazakhstan,2,"Ranked 24th in UN e-government in 2024",International Org,EGDI
Kazakhstan,3,"Broadband averaged $9.08/month in 2024, 8th cheapest in the world",Research/Report,BBP
Kenya,1,"35% of people used the internet in 2024",International Org,ITU
Kenya,2,"Tier 1 in the ITU Global Cybersecurity Index 2024",International Org,GCI
Kenya,3,"Ranked 109th in UN e-government in 2024",International Org,EGDI
Kiribati,1,"89.4% of people used the internet in 2024",International Org,ITU
Kiribati,2,"Ranked 147th in UN e-government in 2024",International Org,EGDI
Kiribati,3,"1GB of mobile data cost $3.19 in 2023",Research/Report,MOB
Kosovo,1,"98.6% of households had internet access in 2023",International Org,OECD-K
Kosovo,2,"Mobile broadband penetration reached 93% in 2023",International Org,OECD-K2
Kosovo,3,"1GB of mobile data cost $1.25 in 2023",Research/Report,MOB
Kuwait,1,"100% of people used the internet in 2025",International Org,ITU
Kuwait,2,"Ranked 66th in UN e-government in 2024",International Org,EGDI
Kuwait,3,"1GB of mobile data cost $0.52 in 2023",Research/Report,MOB
Kyrgyzstan,1,"92% of people used the internet in 2024",International Org,ITU
Kyrgyzstan,2,"Cheapest mobile data in the CIS in 2023 at $0.17/GB",Research/Report,MOB
Kyrgyzstan,3,"Ranked 19th for crypto adoption per person in 2025",Research/Report,CHA
Laos,1,"65.6% of people used the internet in 2024",International Org,ITU
Laos,2,"Ranked 152nd in UN e-government in 2024",International Org,EGDI
Laos,3,"1GB of mobile data cost $0.25 in 2023",Research/Report,MOB
Latvia,1,"92.7% of people used the internet in 2024",International Org,ITU
Latvia,2,"Ranked 7th for crypto adoption per person in 2025",Research/Report,CHA
Latvia,3,"Ranked 29th in UN e-government in 2024",International Org,EGDI
Lebanon,1,"80.6% of people used the internet in 2024",International Org,ITU
Lebanon,2,"Averaged just 9.67 Mbps broadband in 2024",Research/Report,SPD
Lebanon,3,"Ranked 126th in UN e-government in 2024",International Org,EGDI
Lesotho,1,"51.8% of people used the internet in 2024",International Org,ITU
Lesotho,2,"Ranked 157th in UN e-government in 2024",International Org,EGDI
Lesotho,3,"1GB of mobile data cost $1.96 in 2023",Research/Report,MOB
Liberia,1,"32.2% of people used the internet in 2024",International Org,ITU
Liberia,2,"Ranked 182nd in UN e-government in 2024",International Org,EGDI
Liberia,3,"1GB of mobile data cost $2.50 in 2023",Research/Report,MOB
Libya,1,"82% of people used the internet in 2024",International Org,ITU
Libya,2,"Slowest broadband in North Africa in 2024 at 8.37 Mbps",Research/Report,SPD
Libya,3,"Ranked 125th in UN e-government in 2024",International Org,EGDI
Liechtenstein,1,"4th-fastest broadband in the world in 2024 at 222.98 Mbps",Research/Report,SPD
Liechtenstein,2,"98.3% of people used the internet in 2024",International Org,ITU
Liechtenstein,3,"Ranked 44th in UN e-government in 2024",International Org,EGDI
Lithuania,1,"89.2% of people used the internet in 2024",International Org,ITU
Lithuania,2,"Ranked 21st in UN e-government in 2024",International Org,EGDI
Lithuania,3,"1GB of mobile data cost $1.26 in 2023",Research/Report,MOB
Luxembourg,1,"99.1% of people used the internet in 2025",International Org,ITU
Luxembourg,2,"Tier 1 in the ITU Global Cybersecurity Index 2024",International Org,GCI
Luxembourg,3,"1GB of mobile data cost $1.70 in 2023",Research/Report,MOB
Macau,1,"3rd-fastest broadband in the world in 2024 at 234.74 Mbps",Research/Report,SPD
Macau,2,"89.8% of people used the internet in 2024",International Org,ITU
Macau,3,"1GB of mobile data cost $1.44 in 2023",Research/Report,MOB
Madagascar,1,"18.7% of people used the internet in 2024",International Org,ITU
Madagascar,2,"Ranked 168th in UN e-government in 2024",International Org,EGDI
Madagascar,3,"1GB of mobile data cost $1.12 in 2023",Research/Report,MOB
Malawi,1,"19% of people used the internet in 2024",International Org,ITU
Malawi,2,"Cheapest mobile data in Sub-Saharan Africa in 2023 at $0.38/GB",Research/Report,MOB
Malawi,3,"Ranked 163rd in UN e-government in 2024",International Org,EGDI
Malaysia,1,"98% of people used the internet in 2024",International Org,ITU
Malaysia,2,"Tier 1 in the ITU Global Cybersecurity Index 2024",International Org,GCI
Malaysia,3,"1GB of mobile data cost $0.28 in 2023",Research/Report,MOB
Maldives,1,"85.2% of people used the internet in 2024",International Org,ITU
Maldives,2,"Ranked 94th in UN e-government in 2024",International Org,EGDI
Maldives,3,"1GB of mobile data cost $2.16 in 2023",Research/Report,MOB
Mali,1,"36.8% of people used the internet in 2024",International Org,ITU
Mali,2,"Ranked 173rd in UN e-government in 2024",International Org,EGDI
Mali,3,"1GB of mobile data cost $4.56 in 2023",Research/Report,MOB
Malta,1,"93.9% of people used the internet in 2024",International Org,ITU
Malta,2,"Cheapest broadband in Western Europe in 2024 at $27.01/month",Research/Report,BBP
Malta,3,"Ranked 28th in UN e-government in 2024",International Org,EGDI
Marshall Islands,1,"65.9% of people used the internet in 2024",International Org,ITU
Marshall Islands,2,"Ranked 143rd in UN e-government in 2024",International Org,EGDI
Marshall Islands,3,"1GB of mobile data cost $6.08 in 2023",Research/Report,MOB
Martinique,1,"1GB of mobile data cost $0.33 in 2023",Research/Report,MOB
Mauritania,1,"45.8% of people used the internet in 2024",International Org,ITU
Mauritania,2,"Ranked 165th in UN e-government in 2024",International Org,EGDI
Mauritania,3,"1GB of mobile data cost $1.32 in 2023",Research/Report,MOB
Mauritius,1,"73.3% of people used the internet in 2024",International Org,ITU
Mauritius,2,"Tier 1 in the ITU Global Cybersecurity Index 2024",International Org,GCI
Mauritius,3,"Ranked 76th in UN e-government in 2024",International Org,EGDI
Mayotte,1,"1GB of mobile data cost $0.71 in 2023",Research/Report,MOB
Mexico,1,"83.1% of people used the internet in 2024",International Org,ITU
Mexico,2,"Ranked 65th in UN e-government in 2024",International Org,EGDI
Mexico,3,"1GB of mobile data cost $2.03 in 2023",Research/Report,MOB
Micronesia,1,"39.5% of people used the internet in 2024",International Org,ITU
Micronesia,2,"Ranked 167th in UN e-government in 2024",International Org,EGDI
Micronesia,3,"1GB of mobile data cost $7.11 in 2023",Research/Report,MOB
Moldova,1,"77.4% of people used the internet in 2024",International Org,ITU
Moldova,2,"Ranked 2nd for crypto adoption per person in 2025",Research/Report,CHA
Moldova,3,"Cheapest mobile data in Eastern Europe in 2023 at $0.28/GB",Research/Report,MOB
Monaco,1,"99% of people used the internet in 2024",International Org,ITU
Monaco,2,"Ranked 82nd in UN e-government in 2024",International Org,EGDI
Monaco,3,"1GB of mobile data cost $0.42 in 2023",Research/Report,MOB
Mongolia,1,"85.1% of people used the internet in 2024",International Org,ITU
Mongolia,2,"Ranked 46th in UN e-government in 2024",International Org,EGDI
Mongolia,3,"1GB of mobile data cost $0.38 in 2023",Research/Report,MOB
Montenegro,1,"88.9% of people used the internet in 2024",International Org,ITU
Montenegro,2,"Ranked 8th for crypto adoption per person in 2025",Research/Report,CHA
Montenegro,3,"1GB of mobile data cost $0.32 in 2023",Research/Report,MOB
Montserrat,1,"1GB of mobile data cost $2.26 in 2023",Research/Report,MOB
Morocco,1,"91.2% of people used the internet in 2024",International Org,ITU
Morocco,2,"Tier 1 in the ITU Global Cybersecurity Index 2024",International Org,GCI
Morocco,3,"Ranked 90th in UN e-government in 2024",International Org,EGDI
Mozambique,1,"20.5% of people used the internet in 2024",International Org,ITU
Mozambique,2,"Broadband averaged $118.26/month in 2024",Research/Report,BBP
Mozambique,3,"Ranked 177th in UN e-government in 2024",International Org,EGDI
Myanmar,1,"45.4% of people used the internet in 2020",International Org,ITU
Myanmar,2,"Ranked 138th in UN e-government in 2024",International Org,EGDI
Myanmar,3,"1GB of mobile data cost $0.99 in 2023",Research/Report,MOB
Namibia,1,"64.9% of people used the internet in 2024",International Org,ITU
Namibia,2,"Ranked 114th in UN e-government in 2024",International Org,EGDI
Namibia,3,"1GB of mobile data cost $1.20 in 2023",Research/Report,MOB
Nauru,1,"83% of people used the internet in 2024",International Org,ITU
Nauru,2,"Ranked 151st in UN e-government in 2024",International Org,EGDI
Nauru,3,"1GB of mobile data cost $3.09 in 2023",Research/Report,MOB
Nepal,1,"94.2% of people used the internet in 2026",International Org,ITU
Nepal,2,"Ranked 119th in UN e-government in 2024",International Org,EGDI
Nepal,3,"1GB of mobile data cost $0.43 in 2023",Research/Report,MOB
Netherlands,1,"Chip-tool maker ASML reported record sales of €32.7B in 2025, up 15.6%",Company-Marketed,ASML
Netherlands,2,"97% of people used the internet in 2024",International Org,ITU
Netherlands,3,"Ranked 10th in UN e-government in 2024",International Org,EGDI
New Caledonia,1,"Broadband averaged $27.70/month in 2024, Oceania's 2nd cheapest",Research/Report,BBP
New Caledonia,2,"Averaged 50.61 Mbps broadband in 2024",Research/Report,SPD
New Caledonia,3,"1GB of mobile data cost $3.76 in 2023",Research/Report,MOB
New Zealand,1,"93.5% of people used the internet in 2024",International Org,ITU
New Zealand,2,"Fastest broadband in Oceania in 2024 at 124.01 Mbps",Research/Report,SPD
New Zealand,3,"Ranked 16th in UN e-government in 2024",International Org,EGDI
Nicaragua,1,"61.4% of people used the internet in 2024",International Org,ITU
Nicaragua,2,"Cheapest mobile data in Central America in 2023 at $0.55/GB",Research/Report,MOB
Nicaragua,3,"Ranked 132nd in UN e-government in 2024",International Org,EGDI
Niger,1,"39.5% of people used the internet in 2025",International Org,ITU
Niger,2,"Ranked 187th in UN e-government in 2024",International Org,EGDI
Niger,3,"1GB of mobile data cost $1.63 in 2023",Research/Report,MOB
Nigeria,1,"41.2% of people used the internet in 2024",International Org,ITU
Nigeria,2,"Ranked 6th in Chainalysis' 2025 crypto adoption index",Research/Report,CHA
Nigeria,3,"1GB of mobile data cost $0.39 in 2023",Research/Report,MOB
Niue,1,"1GB of mobile data cost $3.14 in 2023",Research/Report,MOB
Niue,2,"Broadband averaged $24.17/month in 2026",Research/Report,BG26
North Korea,1,"Per Chainalysis, state-linked hackers stole at least $2.02B in crypto in 2025, up 51% on 2024; Bybit alone was $1.5B and the all-time total is $6.75B",Research/Report,DPRK
North Korea,2,"Ranked 184th of 193 in UN e-government in 2024",International Org,EGDI
North Macedonia,1,"93.1% of people used the internet in 2025",International Org,ITU
North Macedonia,2,"Ranked 84th in UN e-government in 2024",International Org,EGDI
North Macedonia,3,"1GB of mobile data cost $0.86 in 2023",Research/Report,MOB
Northern Mariana Islands,1,"1GB of mobile data cost $2.67 in 2023",Research/Report,MOB
Norway,1,"99% of people used the internet in 2024",International Org,ITU
Norway,2,"Ranked 15th in UN e-government in 2024",International Org,EGDI
Norway,3,"1GB of mobile data cost $4.07 in 2023",Research/Report,MOB
Oman,1,"95.3% of people used the internet in 2024",International Org,ITU
Oman,2,"Tier 1 in the ITU Global Cybersecurity Index 2024",International Org,GCI
Oman,3,"Broadband averaged $95.47/month in 2024",Research/Report,BBP
Pakistan,1,"Ranked 3rd in Chainalysis' 2025 crypto adoption index",Research/Report,CHA
Pakistan,2,"Among the cheapest mobile data in the world in 2023 at $0.12/GB",Research/Report,MOB
Pakistan,3,"57.3% of people used the internet in 2024",International Org,ITU
Palau,1,"83.9% of people used the internet in 2024",International Org,ITU
Palau,2,"Ranked 137th in UN e-government in 2024",International Org,EGDI
Palau,3,"1GB of mobile data cost $2.25 in 2023",Research/Report,MOB
Palestine,1,"92% of households had home internet access in 2022",Government/Official,PCBS
Palestine,2,"86.6% of people used the internet in 2023",International Org,ITU
Palestine,3,"1GB of mobile data cost $1.08 in 2023",Research/Report,MOB
Panama,1,"72.8% of people used the internet in 2024",International Org,ITU
Panama,2,"Fastest broadband in Central America in 2024 at 62.43 Mbps",Research/Report,SPD
Panama,3,"Ranked 79th in UN e-government in 2024",International Org,EGDI
Papua New Guinea,1,"18.8% of people used the internet in 2024",International Org,ITU
Papua New Guinea,2,"Ranked 171st in UN e-government in 2024",International Org,EGDI
Papua New Guinea,3,"1GB of mobile data cost $1.36 in 2023",Research/Report,MOB
Paraguay,1,"85.4% of people used the internet in 2025",International Org,ITU
Paraguay,2,"Ranked 80th in UN e-government in 2024",International Org,EGDI
Paraguay,3,"1GB of mobile data cost $1.04 in 2023",Research/Report,MOB
Peru,1,"82% of people used the internet in 2024",International Org,ITU
Peru,2,"Ranked 58th in UN e-government in 2024",International Org,EGDI
Peru,3,"1GB of mobile data cost $0.45 in 2023",Research/Report,MOB
Philippines,1,"67.3% of people used the internet in 2024",International Org,ITU
Philippines,2,"Ranked 9th in Chainalysis' 2025 crypto adoption index",Research/Report,CHA
Philippines,3,"Ranked 73rd in UN e-government in 2024",International Org,EGDI
Poland,1,"89.7% of people used the internet in 2025",International Org,ITU
Poland,2,"Ranked 37th in UN e-government in 2024",International Org,EGDI
Poland,3,"1GB of mobile data cost $0.37 in 2023",Research/Report,MOB
Portugal,1,"88.5% of people used the internet in 2024",International Org,ITU
Portugal,2,"Ranked 20th for crypto adoption per person in 2025",Research/Report,CHA
Portugal,3,"Tier 1 in the ITU Global Cybersecurity Index 2024",International Org,GCI
Puerto Rico,1,"87.3% of people used the internet in 2022",International Org,ITU
Puerto Rico,2,"Averaged 118.54 Mbps broadband in 2024, 30th in the world",Research/Report,SPD
Puerto Rico,3,"1GB of mobile data cost $2.58 in 2023",Research/Report,MOB
Qatar,1,"98.1% of people used the internet in 2024",International Org,ITU
Qatar,2,"Tier 1 in the ITU Global Cybersecurity Index 2024",International Org,GCI
Qatar,3,"Averaged 101.72 Mbps broadband in 2024",Research/Report,SPD
Réunion,1,"Fastest broadband in Sub-Saharan Africa in 2024 at 63.29 Mbps",Research/Report,SPD
Réunion,2,"1GB of mobile data cost $0.48 in 2023",Research/Report,MOB
Romania,1,"93.2% of people used the internet in 2025",International Org,ITU
Romania,2,"Broadband averaged $8.60/month in 2024, 6th cheapest in the world",Research/Report,BBP
Romania,3,"Ranked 72nd in UN e-government in 2024",International Org,EGDI
Russia,1,"95.6% of people used the internet in 2025",International Org,ITU
Russia,2,"Ranked 10th in Chainalysis' 2025 crypto adoption index",Research/Report,CHA
Russia,3,"1GB of mobile data cost $0.25 in 2023",Research/Report,MOB
Rwanda,1,"31.7% of people used the internet in 2024",International Org,ITU
Rwanda,2,"Tier 1 in the ITU Global Cybersecurity Index 2024",International Org,GCI
Rwanda,3,"1GB of mobile data cost $0.55 in 2023",Research/Report,MOB
Saint Barthélemy,1,"Broadband averaged $207.26/month in 2026, 4th priciest in the world",Research/Report,VC26
Saint Barthélemy,2,"1GB of mobile data cost $0.80 in 2023",Research/Report,MOB
Saint Helena,1,"1GB of mobile data cost $40.13 in 2023, 3rd priciest in the world",Research/Report,MOB
Saint Kitts and Nevis,1,"76.9% of people used the internet in 2024",International Org,ITU
Saint Kitts and Nevis,2,"Ranked 110th in UN e-government in 2024",International Org,EGDI
Saint Kitts and Nevis,3,"1GB of mobile data cost $1.54 in 2023",Research/Report,MOB
Saint Lucia,1,"68.2% of people used the internet in 2024",International Org,ITU
Saint Lucia,2,"Ranked 133rd in UN e-government in 2024",International Org,EGDI
Saint Lucia,3,"1GB of mobile data cost $1.58 in 2023",Research/Report,MOB
Saint Martin,1,"1GB of mobile data cost $1.58 in 2023",Research/Report,MOB
Saint Pierre and Miquelon,1,"Averaged 56.61 Mbps broadband in 2024",Research/Report,SPD
Saint Pierre and Miquelon,2,"1GB of mobile data cost $1.07 in 2023",Research/Report,MOB
Saint Vincent and the Grenadines,1,"76.2% of people used the internet in 2024",International Org,ITU
Saint Vincent and the Grenadines,2,"Ranked 117th in UN e-government in 2024",International Org,EGDI
Saint Vincent and the Grenadines,3,"1GB of mobile data cost $1.05 in 2023",Research/Report,MOB
Samoa,1,"Cabinet approved a Starlink telecom licence in January 2025",News Media,SAM
Samoa,2,"1GB of mobile data cost $0.36 in 2023, Oceania's 2nd cheapest",Research/Report,MOB
Samoa,3,"Ranked 140th in UN e-government in 2024",International Org,EGDI
San Marino,1,"4th-cheapest mobile data in the world in 2023 at $0.10/GB",Research/Report,MOB
San Marino,2,"97.4% of people used the internet in 2024",International Org,ITU
San Marino,3,"Ranked 102nd in UN e-government in 2024",International Org,EGDI
Sao Tome and Principe,1,"59.1% of people used the internet in 2024",International Org,ITU
Sao Tome and Principe,2,"Ranked 154th in UN e-government in 2024",International Org,EGDI
Sao Tome and Principe,3,"1GB of mobile data cost $2.41 in 2023",Research/Report,MOB
Saudi Arabia,1,"100% of people used the internet in 2026",International Org,ITU
Saudi Arabia,2,"Ranked 6th in UN e-government in 2024",International Org,EGDI
Saudi Arabia,3,"Tier 1 in the ITU Global Cybersecurity Index 2024",International Org,GCI
Senegal,1,"60.1% of people used the internet in 2024",International Org,ITU
Senegal,2,"Ranked 135th in UN e-government in 2024",International Org,EGDI
Senegal,3,"1GB of mobile data cost $1.63 in 2023",Research/Report,MOB
Serbia,1,"87.7% of people used the internet in 2024",International Org,ITU
Serbia,2,"Tier 1 in the ITU Global Cybersecurity Index 2024",International Org,GCI
Serbia,3,"Ranked 39th in UN e-government in 2024",International Org,EGDI
Seychelles,1,"87.8% of people used the internet in 2024",International Org,ITU
Seychelles,2,"Ranked 92nd in UN e-government in 2024",International Org,EGDI
Seychelles,3,"1GB of mobile data cost $5.43 in 2023",Research/Report,MOB
Sierra Leone,1,"25.1% of people used the internet in 2024",International Org,ITU
Sierra Leone,2,"Ranked 172nd in UN e-government in 2024",International Org,EGDI
Sierra Leone,3,"1GB of mobile data cost $0.67 in 2023",Research/Report,MOB
Singapore,1,"Ranked 3rd in UN e-government in 2024",International Org,EGDI
Singapore,2,"94.4% of people used the internet in 2024",International Org,ITU
Singapore,3,"Ranked 15th for crypto adoption per person in 2025",Research/Report,CHA
Sint Maarten,1,"Averaged 18.17 Mbps broadband in 2024",Research/Report,SPD
Sint Maarten,2,"1GB of mobile data cost $2.77 in 2023",Research/Report,MOB
Slovakia,1,"89.8% of people used the internet in 2024",International Org,ITU
Slovakia,2,"Fastest broadband in Eastern Europe in 2024 at 145.19 Mbps",Research/Report,SPD
Slovakia,3,"Ranked 60th in UN e-government in 2024",International Org,EGDI
Slovenia,1,"90.8% of people used the internet in 2024",International Org,ITU
Slovenia,2,"Ranked 10th for crypto adoption per person in 2025",Research/Report,CHA
Slovenia,3,"Tier 1 in the ITU Global Cybersecurity Index 2024",International Org,GCI
Solomon Islands,1,"Most expensive broadband in the world in 2024 at $457.84/month",Research/Report,BBP
Solomon Islands,2,"29% of people used the internet in 2024",International Org,ITU
Solomon Islands,3,"1GB of mobile data cost $6.96 in 2023",Research/Report,MOB
Somalia,1,"27.9% of people used the internet in 2024",International Org,ITU
Somalia,2,"Ranked 191st in UN e-government in 2024",International Org,EGDI
Somalia,3,"1GB of mobile data cost $0.50 in 2023",Research/Report,MOB
South Africa,1,"78.4% of people used the internet in 2024",International Org,ITU
South Africa,2,"Ranked 40th in UN e-government in 2024",International Org,EGDI
South Africa,3,"1GB of mobile data cost $1.81 in 2023",Research/Report,MOB
South Korea,1,"SK hynix posted record 2025 revenue of 97.15 trillion won on booming HBM AI-memory demand",Company-Marketed,SKH
South Korea,2,"Ranked 4th in UN e-government in 2024",International Org,EGDI
South Korea,3,"Ranked 15th in Chainalysis' 2025 crypto adoption index",Research/Report,CHA
South Sudan,1,"Slowest broadband in the world in 2020 at 0.58 Mbps",News Media,SPD20
South Sudan,2,"1GB of mobile data cost $23.70 in 2023",Research/Report,MOB
South Sudan,3,"Ranked 192nd in UN e-government in 2024",International Org,EGDI
Spain,1,"95.8% of people used the internet in 2024",International Org,ITU
Spain,2,"Ranked 17th in UN e-government in 2024",International Org,EGDI
Spain,3,"1GB of mobile data cost $0.48 in 2023",Research/Report,MOB
Sri Lanka,1,"54.6% of people used the internet in 2024",International Org,ITU
Sri Lanka,2,"Ranked 98th in UN e-government in 2024",International Org,EGDI
Sri Lanka,3,"1GB of mobile data cost $0.25 in 2023",Research/Report,MOB
Sudan,1,"Cheapest fixed broadband in the world in 2024 at $2.40/month",Research/Report,BBP
Sudan,2,"1GB of mobile data cost $1.16 in 2023",Research/Report,MOB
Sudan,3,"Ranked 178th in UN e-government in 2024",International Org,EGDI
Suriname,1,"87.4% of people used the internet in 2023",International Org,ITU
Suriname,2,"Ranked 106th in UN e-government in 2024",International Org,EGDI
Suriname,3,"1GB of mobile data cost $0.95 in 2023",Research/Report,MOB
Svalbard and Jan Mayen,1,"1GB of mobile data cost $9.00 in 2023",Research/Report,MOB
Sweden,1,"95.8% of people used the internet in 2025",International Org,ITU
Sweden,2,"Ranked 14th in UN e-government in 2024",International Org,EGDI
Sweden,3,"Tier 1 in the ITU Global Cybersecurity Index 2024",International Org,GCI
Switzerland,1,"97.3% of people used the internet in 2025",International Org,ITU
Switzerland,2,"Most expensive mobile data in Western Europe in 2023 at $7.29/GB",Research/Report,MOB
Switzerland,3,"Ranked 26th in UN e-government in 2024",International Org,EGDI
Syria,1,"49.2% of people used the internet in 2022",International Org,ITU
Syria,2,"Averaged just 2.80 Mbps broadband in 2024, 3rd slowest in the world",Research/Report,SPD
Syria,3,"Ranked 162nd in UN e-government in 2024",International Org,EGDI
Taiwan,1,"TSMC's 2025 revenue hit NT$3,809.05B, up 31.6%",Company-Marketed,TSMC
Taiwan,2,"96.7% of people used the internet in 2024",International Org,ITU
Taiwan,3,"1GB of mobile data cost $0.69 in 2023",Research/Report,MOB
Tajikistan,1,"55.8% of people used the internet in 2024",International Org,ITU
Tajikistan,2,"Averaged 3.10 Mbps broadband in 2024, 5th slowest in the world",Research/Report,SPD
Tajikistan,3,"Ranked 123rd in UN e-government in 2024",International Org,EGDI
Tanzania,1,"31.2% of people used the internet in 2024",International Org,ITU
Tanzania,2,"Tier 1 in the ITU Global Cybersecurity Index 2024",International Org,GCI
Tanzania,3,"Ranked 153rd in UN e-government in 2024",International Org,EGDI
Thailand,1,"90.9% of people used the internet in 2024",International Org,ITU
Thailand,2,"Ranked 17th in Chainalysis' 2025 crypto adoption index",Research/Report,CHA
Thailand,3,"Tier 1 in the ITU Global Cybersecurity Index 2024",International Org,GCI
Timor-Leste,1,"35% of people used the internet in 2021",International Org,ITU
Timor-Leste,2,"Ranked 159th in UN e-government in 2024",International Org,EGDI
Timor-Leste,3,"1GB of mobile data cost $1.92 in 2023",Research/Report,MOB
Togo,1,"39.5% of people used the internet in 2024",International Org,ITU
Togo,2,"Ranked 161st in UN e-government in 2024",International Org,EGDI
Togo,3,"1GB of mobile data cost $1.45 in 2023",Research/Report,MOB
Tokelau,1,"1GB of mobile data cost $17.24 in 2023, the priciest in Oceania",Research/Report,MOB
Tonga,1,"67.4% of people used the internet in 2024",International Org,ITU
Tonga,2,"Cheapest broadband in Oceania in 2024 at $17.66/month",Research/Report,BBP
Tonga,3,"Ranked 134th in UN e-government in 2024",International Org,EGDI
Trinidad and Tobago,1,"82.2% of people used the internet in 2024",International Org,ITU
Trinidad and Tobago,2,"Ranked 86th in UN e-government in 2024",International Org,EGDI
Trinidad and Tobago,3,"1GB of mobile data cost $0.32 in 2023",Research/Report,MOB
Tunisia,1,"76.5% of people used the internet in 2024",International Org,ITU
Tunisia,2,"Ranked 87th in UN e-government in 2024",International Org,EGDI
Tunisia,3,"1GB of mobile data cost $1.28 in 2023",Research/Report,MOB
Türkiye,1,"89.8% of people used the internet in 2025",International Org,ITU
Türkiye,2,"Ranked 14th in Chainalysis' 2025 crypto adoption index",Research/Report,CHA
Türkiye,3,"Ranked 27th in UN e-government in 2024",International Org,EGDI
Turkmenistan,1,"Averaged 2.72 Mbps broadband in 2024, 2nd slowest in the world",Research/Report,SPD
Turkmenistan,2,"Most expensive mobile data in the CIS in 2023 at $11.42/GB",Research/Report,MOB
Turkmenistan,3,"Ranked 145th in UN e-government in 2024",International Org,EGDI
Turks and Caicos Islands,1,"Broadband averaged $212/month in 2024, 3rd priciest in the world",Research/Report,BBP
Turks and Caicos Islands,2,"Broadband averaged $252/month in 2026",Research/Report,VC26
Turks and Caicos Islands,3,"1GB of mobile data cost $0.59 in 2023",Research/Report,MOB
Tuvalu,1,"Under its VeriSign contract, the .tv domain earned Tuvalu $5M a year, 1/12 of its $67M+ gross income in 2020 (World Bank); experts estimate the 2021 GoDaddy deal could bring up to $10M a year, though the government has not given a figure",News Media,TV
Tuvalu,2,"1GB of mobile data cost $6.08 in 2023",Research/Report,MOB
Tuvalu,3,"Ranked 158th in UN e-government in 2024",International Org,EGDI
Uganda,1,"Only 8.95% of people used the internet in 2024",International Org,ITU
Uganda,2,"Ranked 150th in UN e-government in 2024",International Org,EGDI
Uganda,3,"1GB of mobile data cost $1.11 in 2023",Research/Report,MOB
Ukraine,1,"Ranked No. 1 for crypto adoption per person in 2025",Research/Report,CHA
Ukraine,2,"Broadband averaged $7.35/month in 2024, 4th cheapest in the world",Research/Report,BBP
Ukraine,3,"Ranked 30th in UN e-government in 2024",International Org,EGDI
United Arab Emirates,1,"100% of people used the internet in 2024",International Org,ITU
United Arab Emirates,2,"Ranked 11th in UN e-government in 2024",International Org,EGDI
United Arab Emirates,3,"Broadband averaged $142.65/month in 2024",Research/Report,BBP
United Kingdom,1,"95.5% of people used the internet in 2024",International Org,ITU
United Kingdom,2,"Ranked 11th in Chainalysis' 2025 crypto adoption index",Research/Report,CHA
United Kingdom,3,"Ranked 7th in UN e-government in 2024",International Org,EGDI
United States,1,"Nvidia posted record fiscal-2026 revenue of $215.9B, up 65%",Company-Marketed,NVDA
United States,2,"Ranked 2nd in Chainalysis' 2025 crypto adoption index",Research/Report,CHA
United States,3,"Most expensive mobile data in North America in 2023 at $6.00/GB",Research/Report,MOB
US Virgin Islands,1,"Allocated $27.1M in US BEAD broadband funding in 2023",News Media,BEAD
US Virgin Islands,2,"1GB of mobile data cost $4.33 in 2023",Research/Report,MOB
Uruguay,1,"92% of people used the internet in 2024",International Org,ITU
Uruguay,2,"Fastest broadband in South America in 2024 at 111.46 Mbps",Research/Report,SPD
Uruguay,3,"Ranked 25th in UN e-government in 2024",International Org,EGDI
Uzbekistan,1,"89.5% of people used the internet in 2024",International Org,ITU
Uzbekistan,2,"Ranked 63rd in UN e-government in 2024",International Org,EGDI
Uzbekistan,3,"1GB of mobile data cost $0.30 in 2023",Research/Report,MOB
Vanuatu,1,"Averaged 7.67 Mbps broadband in 2024",Research/Report,SPD
Vanuatu,2,"1GB of mobile data cost $1.54 in 2023",Research/Report,MOB
Vanuatu,3,"Ranked 129th in UN e-government in 2024",International Org,EGDI
Vatican City,1,"89.2% of people used the internet in 2024",International Org,ITU
Vatican City,2,"Averaged 51.60 Mbps broadband in 2024, slowest in Western Europe",Research/Report,SPD
Venezuela,1,"76.7% of people used the internet in 2024",International Org,ITU
Venezuela,2,"Ranked 18th in Chainalysis' 2025 crypto adoption index",Research/Report,CHA
Venezuela,3,"Slowest broadband in South America in 2024 at 10.92 Mbps",Research/Report,SPD
Vietnam,1,"84.2% of people used the internet in 2024",International Org,ITU
Vietnam,2,"Ranked 4th in Chainalysis' 2025 crypto adoption index",Research/Report,CHA
Vietnam,3,"Tier 1 in the ITU Global Cybersecurity Index 2024",International Org,GCI
Wallis and Futuna,1,"Most expensive broadband in the world in 2026 at $373.88/month",Research/Report,VC26
Wallis and Futuna,2,"Slowest broadband in Oceania in 2024 at 4.66 Mbps",Research/Report,SPD
Western Sahara,1,"Cheapest mobile data in North Africa in 2023 at $0.58/GB",Research/Report,MOB
Yemen,1,"Ranked 16th in Chainalysis' 2025 crypto adoption index",Research/Report,CHA
Yemen,2,"Most expensive mobile data in the Near East in 2023 at $15.68/GB",Research/Report,MOB
Yemen,3,"Averaged 2.99 Mbps broadband in 2024, 4th slowest in the world",Research/Report,SPD
Zambia,1,"17.1% of people used the internet in 2024",International Org,ITU
Zambia,2,"Ranked 130th in UN e-government in 2024",International Org,EGDI
Zambia,3,"1GB of mobile data cost $8.01 in 2023",Research/Report,MOB
Zimbabwe,1,"Most expensive mobile data in the world in 2023 at $43.75/GB",Research/Report,MOB
Zimbabwe,2,"41.6% of people used the internet in 2024",International Org,ITU
Zimbabwe,3,"Ranked 149th in UN e-government in 2024",International Org,EGDI
```

## JSON format
The JSON has exactly the same records as the CSV. Each record is an object with four fields, and records are grouped by country. To build it, read the CSV, replace each source key with its URL from the Source Key table, and output one object per row. Pasting the full JSON here as well would double the length of an already very long dataset, so it is left as a conversion step.
```json
[
  {"country":"Afghanistan","trivia":"Only 16.1% of people used the internet in 2024","tag":"International Org","source":"https://en.wikipedia.org/wiki/List_of_countries_by_number_of_Internet_users"},
  {"country":"Anguilla","trivia":".ai domain sales earned EC$87M (~US$32M) in 2023, just over 20% of government revenue","tag":"International Org","source":"https://www.imf.org/en/news/articles/2024/05/15/cf-an-ai-powered-boost-to-anguillas-revenues"}
]
```

## Caveats
- **Source quality:** ITU, UN DESA, OECD, IMF and government statistics offices are the most reliable sources. The Cable.co.uk/BestBroadbandDeals and Broadband Genie tables come from commercial price-comparison sites (single snapshot, local currency converted to USD). Chainalysis is a vendor publishing its own analysis. Company results (Nvidia, TSMC, ASML, SK hynix) are self-reported but filed with regulators. All of these are tagged accordingly.
- **ITU figures are taken from a Wikipedia compilation of ITU DataHub data.** Before publishing, check headline figures against datahub.itu.int. Rows dated 2025–2026 (e.g., Nepal 2026, Saudi Arabia 2026) may be provisional estimates.\[9\]
- **The broadband-speed tables mix two periods.** Faroe Islands and Saint Pierre and Miquelon both show 56.61 Mbps in the 2024 speed league, which looks like an error in the source.\[4\] The Gibraltar gambling share (~30% of GDP) is the government's own figure, given by Minister Nigel Feetham to Parliament (HM Government of Gibraltar press release 913/2025, 1 Dec 2025). The URL in the dataset points to the NEXT.io article covering it; you can swap in the government press release if you prefer a primary source.
- **ITU internet data for many territories predates 2020** and was excluded (e.g., Aruba 2017, Greenland 2017, Kosovo 2018, Turkmenistan 2016, Yemen 2019, Sudan 2017, Samoa 2014, Vanuatu 2015, Tuvalu 2017, South Sudan 2019).\[9\]

**Countries and territories with fewer than 3 verifiable items:**
- 2 items: North Korea, Eritrea, Vatican City, American Samoa, US Virgin Islands, Curaçao, French Guiana, Niue, Réunion, Saint Barthélemy, Saint Pierre and Miquelon, Sint Maarten, Wallis and Futuna
- 1 item: Aruba, Caribbean Netherlands, Christmas Island, Cocos (Keeling) Islands, Cook Islands, Guadeloupe, Martinique, Mayotte, Montserrat, Northern Mariana Islands, Saint Helena, Saint Martin, Svalbard and Jan Mayen, Tokelau, Western Sahara
- 0 items: Pitcairn Islands, French Southern Territories, US Minor Outlying Islands (no 2020+ data found)

## Sources

1. [The Cost of 1GB Of Mobile Data in 237 Countries](https://bestbroadbanddeals.co.uk/mobiles/worldwide-data-pricing/)
2. [Worldwide Broadband Price Research 2024](https://bestbroadbanddeals.co.uk/broadband/pricing/worldwide-comparison/)
3. [1 Broadband Pricing 2024 \*\*\*STRICTLY EMBARGOED UNTIL TUESDAY 14](https://bestbroadbanddeals.co.uk/broadband/worldwide-pricing/2024/broadband_price_comparison_press_release.pdf)
4. [Worldwide Broadband Speed League 2024](https://bestbroadbanddeals.co.uk/broadband/speed/worldwide-speed-league/)
5. [This small Caribbean island earned \$39M from .ai domain sales in 2024 boom](https://getcoai.com/news/anguilla-earns-39m-from-ai-domain-sales-in-2024-boom/)
6. [.tv](https://en.wikipedia.org/wiki/.tv)
7. [Internet users statistics 2025: by country and over time](https://statorigin.org/statistics/internet-users)
8. [Data Center](https://publicadministration.un.org/egovkb/en-us/data-center)
9. [List of countries by number of Internet users](https://en.wikipedia.org/wiki/List_of_countries_by_number_of_Internet_users)
10. [UPI completes 10 glorious years, Emerges as World’s Largest Real-Time Payments Platform, Anchoring India’s Digital Economy](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2257087&reg=48&lang=2)
