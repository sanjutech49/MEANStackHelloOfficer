var user;

Session.get_user().then(function (data){
          user=data;   
    });


    // var wsUrl = "http://myserver/anysite/_layouts/myfolder/webservice1.asmx?op=Hello";
    var wsUrl='/soap_test/TvccServiceImplService.wsdl';

    var soapRequest= '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" \
    xmlns:ser="http://service.application.tvcc.dmv.ca.gov/"> \
    <soapenv:Header/> \
    <soapenv:Body> \
          <ser:addCourseCompletion> \
    <arg0> \
    <ccDate>"' +user.finalExamCompletionDate+ '"</ccDate> \
    <courtCd>"' +user.ticket_court+ '"</courtCd> \
    <dateOfBirth>"' +user.birthdate+ '"</dateOfBirth> \
    <dlNbr>"' +user.dl_number+ '"</dlNbr> \
                <firstName>"' +user.first_name+ '"</firstName>\
                <lastName>"' +user.last_name+ '"</lastName> \
                <modality>4T</modality> \
    <refNbr>"' +user.ticket_number+ '"</refNbr> \
    <userDto> \
    <password>Hello123</password> \
    <userId>molliekaiser@yahoo.com</userId> \
    </userDto> \
    </arg0> \
          </ser:addCourseCompletion> \
    </soapenv:Body> \
    </soapenv:Envelope>';

        $.ajax({
            type: "POST",
            url: wsUrl,
            contentType: "text/xml",
            dataType: "xml",
            data: soapRequest,
            success: processSuccess,
            error: processError
        });

        function processSuccess(data, status, req) {
            if (status == "success")
                // $("#response").text($(req.responseXML).find("HelloResult").text());
                console.log($(req.responseXML).text());
        }

        function processError(data, status, req) {
            console.log(req.responseText + " " + status);
        }  







<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://service.application.tvcc.dmv.ca.gov/">
  <SOAP-ENV:Body>
    <ns1:addCourseCompletion>
      <arg0>
        <ccDate>2015-01-01</ccDate>
        <courtCd>19463</courtCd>
        <dateOfBirth>1971-01-01</dateOfBirth>
        <dlNbr>A1234567</dlNbr>
        <firstName>Steven</firstName>
        <lastName>Hinesley</lastName>
        <modality>4T</modality>
        <refNbr>TESTING</refNbr>
        <userDto>
          <password>BTnj434!26</password>
          <userId>steve@maskmyticket.com</userId>
        </userDto>
      </arg0>
    </ns1:addCourseCompletion>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>















/* 1 */
{
    "_id" : ObjectId("56dfe820ef43f055178c4e7c"),
    "county_name" : "Alameda ",
    "count_code" : "01430",
    "court_name" : "Fremont Traffic Court",
    "court_city" : "Fremont"
}

/* 2 */
{
    "_id" : ObjectId("56dfe820ef43f055178c4e7d"),
    "county_name" : "Alpine",
    "count_code" : "02100",
    "court_name" : "Alpine County Superior Court ",
    "court_city" : "Markleeville"
}

/* 3 */
{
    "_id" : ObjectId("56dfe820ef43f055178c4e7e"),
    "county_name" : "Amador ",
    "count_code" : "03610",
    "court_name" : "Amador County Superior Court ",
    "court_city" : "Jackson"
}

/* 4 */
{
    "_id" : ObjectId("56dfe821ef43f055178c4e7f"),
    "county_name" : "Butte ",
    "count_code" : "04100",
    "court_name" : "Butte County Superior Court ",
    "court_city" : "Oroville"
}

/* 5 */
{
    "_id" : ObjectId("56dfe821ef43f055178c4e80"),
    "county_name" : "Calaveras ",
    "count_code" : "05100",
    "court_name" : "Calaveras County Superior Court ",
    "court_city" : "San Andreas"
}

/* 6 */
{
    "_id" : ObjectId("56dfe821ef43f055178c4e81"),
    "county_name" : "Colusa ",
    "count_code" : "06620",
    "court_name" : "Colusa County Superior ",
    "court_city" : "Court Colusa"
}

/* 7 */
{
    "_id" : ObjectId("56dfe822ef43f055178c4e82"),
    "county_name" : "Contra Costa ",
    "count_code" : "07410",
    "court_name" : "Concord Superior Court ",
    "court_city" : "Concord"
}



















{
    "_id" : ObjectId("56e13385ef43f055178c4ea0"),
    "county_name" : "Alameda ",
    "count_code" : "01430",
    "court_name" : "Fremont Traffic Court",
    "court_city" : "Fremont"
}

{
    "_id" : ObjectId("56e13385ef43f055178c4ea1"),
    "county_name" : "Alameda ",
    "count_code" : "01440",
    "court_name" : "Oakland Traffic Court",
    "court_city" : "Oakland"
}

{
    "_id" : ObjectId("56e13386ef43f055178c4ea2"),
    "county_name" : "Alpine",
    "count_code" : "02100",
    "court_name" : "Alpine County Superior Court (Traffic and Criminal)",
    "court_city" : "Markleeville"
}

{
    "_id" : ObjectId("56e13386ef43f055178c4ea3"),
    "county_name" : "Alpine",
    "count_code" : "02200",
    "court_name" : "Alpine Superior Court (Juvenile Court)",
    "court_city" : "Markleeville"
}

{
    "_id" : ObjectId("56e13386ef43f055178c4ea4"),
    "county_name" : "Amador ",
    "count_code" : "03610",
    "court_name" : "Amador County Superior Court ",
    "court_city" : "Jackson"
}

{
    "_id" : ObjectId("56e13387ef43f055178c4ea5"),
    "county_name" : "Butte ",
    "count_code" : "04100",
    "court_name" : "Butte County Superior Court ",
    "court_city" : "Oroville"
}

{
    "_id" : ObjectId("56e13387ef43f055178c4ea6"),
    "county_name" : "Calaveras ",
    "count_code" : "05100",
    "court_name" : "Calaveras County Superior Court ",
    "court_city" : "San Andreas"
}

{
    "_id" : ObjectId("56e13387ef43f055178c4ea7"),
    "county_name" : "Colusa ",
    "count_code" : "06620",
    "court_name" : "Colusa County Superior ",
    "court_city" : "Court Colusa"
}

{
    "_id" : ObjectId("56e13388ef43f055178c4ea8"),
    "county_name" : "Contra Costa ",
    "count_code" : "07410",
    "court_name" : "Concord Superior Court ",
    "court_city" : "Concord"
}

{
    "_id" : ObjectId("56e13388ef43f055178c4ea9"),
    "county_name" : "Contra Costa ",
    "count_code" : "07460",
    "court_name" : "Richmond Superior Court ",
    "court_city" : "Richmond"
}

{
    "_id" : ObjectId("56e13388ef43f055178c4eaa"),
    "county_name" : "Contra Costa ",
    "count_code" : "07465",
    "court_name" : "Pittsburg Superior Court ",
    "court_city" : "Pittsburg"
}

{
    "_id" : ObjectId("56e13388ef43f055178c4eab"),
    "county_name" : "Contra Costa ",
    "count_code" : "07480",
    "court_name" : "Walnut Creek Superior Court ",
    "court_city" : "Walnut Creek"
}

{
    "_id" : ObjectId("56e13389ef43f055178c4eac"),
    "county_name" : "Del Norte ",
    "count_code" : "08100",
    "court_name" : "Del Norte Superior Court ",
    "court_city" : "Crescent City"
}

{
    "_id" : ObjectId("56e13389ef43f055178c4ead"),
    "county_name" : "El Dorado ",
    "count_code" : "09660",
    "court_name" : "El Dorado Superior Court ",
    "court_city" : "South Lake Tahoe"
}

{
    "_id" : ObjectId("56e13389ef43f055178c4eae"),
    "county_name" : "El Dorado ",
    "count_code" : "09670",
    "court_name" : "El Dorado Superior Court ",
    "court_city" : "Placerville"
}

{
    "_id" : ObjectId("56e1338aef43f055178c4eaf"),
    "county_name" : "Fresno ",
    "count_code" : "10440",
    "court_name" : "Fresno Superior Court ",
    "court_city" : "Fresno"
}

{
    "_id" : ObjectId("56e1338aef43f055178c4eb0"),
    "county_name" : "Glenn ",
    "count_code" : "11100",
    "court_name" : "Willows Branch ",
    "court_city" : "Willows"
}

{
    "_id" : ObjectId("56e1338aef43f055178c4eb1"),
    "county_name" : "Humboldt",
    "count_code" : "12100",
    "court_name" : "Humboldt County Superior Court Traffic ",
    "court_city" : "Eureka"
}

{
    "_id" : ObjectId("56e1338bef43f055178c4eb2"),
    "county_name" : "Imperial",
    "count_code" : "13100",
    "court_name" : "Imperial County Superior Court Juvenile ",
    "court_city" : "El Centro"
}

{
    "_id" : ObjectId("56e1338bef43f055178c4eb3"),
    "county_name" : "Imperial",
    "count_code" : "13420",
    "court_name" : "Brawley Branch ",
    "court_city" : "Brawley"
}

{
    "_id" : ObjectId("56e1338bef43f055178c4eb4"),
    "county_name" : "Imperial",
    "count_code" : "13430",
    "court_name" : "Calexico Branch ",
    "court_city" : "Calexico"
}

{
    "_id" : ObjectId("56e1338cef43f055178c4eb5"),
    "county_name" : "Imperial",
    "count_code" : "13440",
    "court_name" : "Imperial County Superior Court ",
    "court_city" : "El Centro"
}

{
    "_id" : ObjectId("56e1338cef43f055178c4eb6"),
    "county_name" : "Imperial",
    "count_code" : "13450",
    "court_name" : "Winterhaven Branch",
    "court_city" : "Winterhaven"
}

{
    "_id" : ObjectId("56e1338cef43f055178c4eb7"),
    "county_name" : "Inyo",
    "count_code" : "14660",
    "court_name" : "Inyo County Superior Court Dept 4 ",
    "court_city" : "Bishop"
}

{
    "_id" : ObjectId("56e1338def43f055178c4eb8"),
    "county_name" : "Kern",
    "count_code" : "15410",
    "court_name" : "Arvin Lamont ",
    "court_city" : "Lamont"
}

{
    "_id" : ObjectId("56e1338def43f055178c4eb9"),
    "county_name" : "Kern",
    "count_code" : "15420",
    "court_name" : "Metro Division ",
    "court_city" : "Bakersfield"
}

{
    "_id" : ObjectId("56e1338def43f055178c4eba"),
    "county_name" : "Kern",
    "count_code" : "15430",
    "court_name" : "Delano McFarland",
    "court_city" : "Delano"
}

{
    "_id" : ObjectId("56e1338eef43f055178c4ebb"),
    "county_name" : "Kern",
    "count_code" : "15440",
    "court_name" : "Taft Maricopa ",
    "court_city" : "Taft"
}

{
    "_id" : ObjectId("56e1338eef43f055178c4ebc"),
    "county_name" : "Kern",
    "count_code" : "15445",
    "court_name" : "Shafter Wasco",
    "court_city" : "Shafter"
}

{
    "_id" : ObjectId("56e1338eef43f055178c4ebd"),
    "county_name" : "Kern",
    "count_code" : "15460",
    "court_name" : "Mojave",
    "court_city" : "Mojave"
}


{
    "_id" : ObjectId("56e1338fef43f055178c4ebe"),
    "county_name" : "Kern",
    "count_code" : "15470",
    "court_name" : "Ridgecrest",
    "court_city" : "Ridgecrest"
}


{
    "_id" : ObjectId("56e1338fef43f055178c4ebf"),
    "county_name" : "Kings",
    "count_code" : "16420",
    "court_name" : "Hanford Division",
    "court_city" : "Hanford"
}


{
    "_id" : ObjectId("56e1338fef43f055178c4ec0"),
    "county_name" : "Kings",
    "count_code" : "16610",
    "court_name" : "Avenal Division",
    "court_city" : "Avenal"
}


{
    "_id" : ObjectId("56e13390ef43f055178c4ec1"),
    "county_name" : "Kings",
    "count_code" : "16620",
    "court_name" : "Corcoran Division",
    "court_city" : "Corcoran"
}


{
    "_id" : ObjectId("56e13390ef43f055178c4ec2"),
    "county_name" : "Kings",
    "count_code" : "16660",
    "court_name" : "Lemoore Division",
    "court_city" : "Lemoore"
}

{
    "_id" : ObjectId("56e13390ef43f055178c4ec3"),
    "county_name" : "Lake",
    "count_code" : "17100",
    "court_name" : "Lakeport Traffic Division",
    "court_city" : "Lakeport"
}

{
    "_id" : ObjectId("56e13391ef43f055178c4ec4"),
    "county_name" : "Lake",
    "count_code" : "17610",
    "court_name" : "Clearlake Traffic Division",
    "court_city" : "Clearlake"
}

{
    "_id" : ObjectId("56e13391ef43f055178c4ec5"),
    "county_name" : "Lassen",
    "count_code" : "18200",
    "court_name" : "Lassen Probation Dept- Juvenile Traffic",
    "court_city" : "Lassen"
}

{
    "_id" : ObjectId("56e13391ef43f055178c4ec6"),
    "county_name" : "Lassen",
    "count_code" : "18675",
    "court_name" : "Lassen Superior Court Hall of Justice",
    "court_city" : "Susanville"
}

{
    "_id" : ObjectId("56e13392ef43f055178c4ec7"),
    "county_name" : "Los Angeles",
    "count_code" : "19463",
    "court_name" : "Central District Metropolitan Courthouse ",
    "court_city" : "Los Angeles"
}

{
    "_id" : ObjectId("56e13392ef43f055178c4ec8"),
    "county_name" : "Madera",
    "count_code" : "20100",
    "court_name" : "Madera County Superior",
    "court_city" : "Court Madera"
}

{
    "_id" : ObjectId("56e13392ef43f055178c4ec9"),
    "county_name" : "Madera",
    "count_code" : "20230",
    "court_name" : "Madera Juvenile Court ",
    "court_city" : "Madera"
}

{
    "_id" : ObjectId("56e13393ef43f055178c4eca"),
    "county_name" : "Madera",
    "count_code" : "20620",
    "court_name" : "Traffic Division",
    "court_city" : "Madera"
}

{
    "_id" : ObjectId("56e13393ef43f055178c4ecb"),
    "county_name" : "Madera",
    "count_code" : "20640",
    "court_name" : "Borden Division",
    "court_city" : "Madera"
}

{
    "_id" : ObjectId("56e13394ef43f055178c4ecc"),
    "county_name" : "Madera",
    "count_code" : "20660",
    "court_name" : "Criminal Division",
    "court_city" : "Madera"
}

{
    "_id" : ObjectId("56e13394ef43f055178c4ecd"),
    "county_name" : "Madera",
    "count_code" : "20680",
    "court_name" : "Sierra Division",
    "court_city" : "Bass Lake"
}

{
    "_id" : ObjectId("56e13394ef43f055178c4ece"),
    "county_name" : "Marin",
    "count_code" : "21420",
    "court_name" : "Marin County Superior Court",
    "court_city" : "San Rafael"
}

{
    "_id" : ObjectId("56e13395ef43f055178c4ecf"),
    "county_name" : "Mariposa",
    "count_code" : "22200",
    "court_name" : "Mariposa Juvenile Court",
    "court_city" : "Mariposa"
}

{
    "_id" : ObjectId("56e13395ef43f055178c4ed0"),
    "county_name" : "Mariposa",
    "count_code" : "22650",
    "court_name" : "Mariposa Judicial District",
    "court_city" : "Mariposa"
}

{
    "_id" : ObjectId("56e13396ef43f055178c4ed1"),
    "county_name" : "Mendocino",
    "count_code" : "23200",
    "court_name" : "Mendocino Juvenile Probation",
    "court_city" : "Ukiah"
}


{"county_name":"Mariposa","count_code":"23210","court_name":"Mendocino Juvenile Probation","court_city":"Ukiah"}
{"county_name":"Mariposa","count_code":"23480","court_name":"Ukiah Branch","court_city":"Ukiah"}
{"county_name":"Merced","count_code":"24400","court_name":"Merced County Superior Court","court_city":"Merced"}
{"county_name":"Modoc","count_code":"25100","court_name":"Modoc County Superior Court","court_city":"Alturas"}
{"county_name":"Mono","count_code":"26660","court_name":"Mammoth Lakes/Bridgeport Branches","court_city":"Mammoth Lakes"}
{"county_name":"Monterey","count_code":"27200","court_name":"Monterey County Superior Court","court_city":"Salinas"}
{"county_name":"Monterey","count_code":"27450","court_name":"Monterey County Superior Court","court_city":"Marina"}
{"county_name":"Napa","count_code":"28100","court_name":"Criminal Courthouse","court_city":"Napa"}
{"county_name":"Nevada","count_code":"29200","court_name":"Nevada City Juvenile Court","court_city":"Nevada City"}
{"county_name":"Nevada","count_code":"29210","court_name":"Truckee Juvenile Court","court_city":"Truckee"}
{"county_name":"Nevada","count_code":"29460","court_name":"Nevada City Branch","court_city":"Nevada City"}
{"county_name":"Nevada","count_code":"29480","court_name":"Truckee Branch","court_city":"Truckee"}
{"county_name":"Orange","count_code":"30470","court_name":"Orange County Superior Court","court_city":"Santa Ana"}
{"county_name":"Placer","count_code":"31455","court_name":"Bill Santucci Justice Center","court_city":"Roseville"}
{"county_name":"Plumas","count_code":"32100","court_name":"Plumas Superior Court","court_city":"Quincy"}
{"county_name":"Plumas","count_code":"32651","court_name":"Plumas Juvenile","court_city":"Portola"}
{"county_name":"Riverside","count_code":"33450","court_name":"Larson Justice Center","court_city":"Indio"}
{"county_name":"Riverside","count_code":"33460","court_name":"Moreno Valley","court_city":"Moreno Valley"}
{"county_name":"Riverside","count_code":"33100","court_name":"Robert Presley Hall of Justice","court_city"::"33460"}
{"county_name":"Riverside","count_code":"33420","court_name":"Corona Court","court_city"::"33460"}
{"county_name":"Riverside","count_code":"33440","court_name":"Hemet Courthouse","court_city"::"33460"}
{"county_name":"Riverside","count_code":"33442","court_name":"Banning Courthouse","court_city"::"33460"}
{"county_name":"Riverside","count_code":"33490","court_name":"Southwest Justice Center","court_city"::"33460"}
{"county_name":"Riverside","count_code":"33491","court_name":"Temecula Courthouse","court_city"::"33460"}
{"county_name":"Riverside","count_code":"33480","court_name":"Blythe Courthouse","court_city"::"33450"}
{"county_name":"Sacramento","count_code":"34470","court_name":"Superior Court of California County of Sacramento","court_city":"Sacramento"}
{"county_name":"San Benito","count_code":"35100","court_name":"San Benito County Superior Court","court_city":"Hollister"}
{"county_name":"San Bernardino","count_code":"36100","court_name":"San Bernardino District Criminal and Traffic","court_city":"San Bernardino"}
{"county_name":"San Bernardino","count_code":"36110","court_name":"San Bernardino Superior Court","court_city":"Rancho Cucamonga"}
{"county_name":"San Bernardino","count_code":"36120","court_name":"San Bernardino Superior Court","court_city":"Victorville"}
{"county_name":"San Bernardino","count_code":"36130","court_name":"San Bernardino Superior Court","court_city":"Barstow"}
{"county_name":"San Bernardino","count_code":"36140","court_name":"San Bernardino Superior Court","court_city":"Joshua Tree"}
{"county_name":"San Bernardino","count_code":"36201","court_name":"San Bernardino Juvenile (On East Gilbert St., Bldg. #35)","court_city":"San Bernardino"}
{"county_name":"San Bernardino","count_code":"36211","court_name":"San Bernardino Juvenile (On Haven Ave.)","court_city":"San Bernardino"}
{"county_name":"San Bernardino","count_code":"36221","court_name":"Victorville Juvenile","court_city":"Victorville"}
{"county_name":"San Bernardino","count_code":"36480","court_name":"San Bernardino Superior Court","court_city":"Fontana"}
{"county_name":"San Bernardino","count_code":"36495","court_name":"San Bernardino Superior Court","court_city":"Rancho Cucamonga"}
{"county_name":"San Bernardino","count_code":"36677","court_name":"San Bernardino Superior Court","court_city":"Joshua Tree"}
{"county_name":"San Diego","count_code":"37200","court_name":"San Diego Juvenile Court","court_city":"San Diego"}
{"county_name":"San Diego","count_code":"37440","court_name":"East County","court_city":"El Cajon"}
{"county_name":"San Diego","count_code":"37465","court_name":"North County","court_city":""}
{"county_name":"San Diego","count_code":"37480","court_name":"Kearny Mesa Traffic Court","court_city":"San Diego"}
{"county_name":"San Diego","count_code":"37485","court_name":"South County","court_city":"Chula Vista"}
{"county_name":"San Francisco","count_code":"38200","court_name":"San Francisco Superior Court Juvenile Court","court_city":"San Francisco"}
{"county_name":"San Francisco","count_code":"38460","court_name":"San Francisco Superior Court (Adult Traffic Court)","court_city":"San Francisco"}
{"county_name":"San Joaquin","count_code":"39100","court_name":"San Joaquin Court","court_city":"French Camp"}
{"county_name":"San Joaquin","count_code":"39460","court_name":"San Joaquin Superior Court","court_city":"Stockton"}
{"county_name":"San Luis Obispo","count_code":"40410","court_name":"San Luis Obispo Superior Court ","court_city":"San Luis Obispo"}
{"county_name":"San Mateo","count_code":"41210","court_name":"Juvenile Traffic Court","court_city":"San Mateo"}
{"county_name":"San Mateo","count_code":"41470","court_name":"Southern Traffic Division","court_city":"Redwood City"}
{"county_name":"Santa Barbara","count_code":"42460","court_name":"Figueroa Division","court_city":"Santa Barbara"}
{"county_name":"Santa Barbara","count_code":"42465","court_name":"Santa Maria Miller Division","court_city":"Santa Maria"}
{"county_name":"","count_code":"42470","court_name":"","court_city":"Lompoc Division"}
{"county_name":"Santa Barbara","count_code":"42675","court_name":"Solvang Division","court_city":"Solvang"}
{"county_name":"Santa Clara","count_code":"43460","court_name":"Palo Alto Courthouse","court_city":"Palo Alto"}
{"county_name":"","count_code":"43471","court_name":"Santa Clara Courthouse","court_city":"Santa Clara"}
{"county_name":"","count_code":"43635","court_name":"South County Morgan Hill Courthouse","court_city":"Morgan Hill"}
{"county_name":"Santa Cruz","count_code":"44460","court_name":"Santa Cruz Courthouse","court_city":"Santa Cruz"}
{"county_name":"Shasta","count_code":"45670","court_name":"Shasta County Superior Court Traffic","court_city":"Redding"}
{"county_name":"Sierra","count_code":"46100","court_name":"Sierra County Superior Court","court_city":"Downieville"}
{"county_name":"Siskiyou","count_code":"47630","court_name":"Dorris Tulelake Branch","court_city":"Dorris"}
{"county_name":"Siskiyou","count_code":"47650","court_name":"Happy Camp Branch","court_city":"Happy Camp"}
{"county_name":"Siskiyou","count_code":"47670","court_name":"Weed Branch","court_city":"Weed"}
{"county_name":"Siskiyou","count_code":"47690","court_name":"Yreka Courthouse","court_city":"Yreka"}
{"county_name":"Solano","count_code":"48200","court_name":"Juvenile Traffic Court","court_city":"Fairfield"}
{"county_name":"Solano","count_code":"48430","court_name":"Hall of Justice","court_city":"Fairfield"}
{"county_name":"Solano","count_code":"48480","court_name":"Solano Justice Center","court_city":"Vallejo"}
{"county_name":"Sonoma","count_code":"49100","court_name":"Sonoma County Superior Court","court_city":"Santa Rosa"}
{"county_name":"Sonoma","count_code":"49200","court_name":"Sonoma County Superior Court Juvenile ","court_city":"Santa Rosa"}
{"county_name":"Sonoma","count_code":"49460","court_name":"Sonoma County Superior Court-Traffic","court_city":"Santa Rosa "}
{"county_name":"Stanislaus","count_code":"50200","court_name":"Juvenile Division (on Blue Gum Ave)","court_city":"Modesto"}
{"county_name":"Stanislaus","count_code":"50450","court_name":"Traffic Division (On Floyd Ave)","court_city":"Modesto"}
{"county_name":"Sutter","count_code":"51460","court_name":"Sutter County Superior Court","court_city":"Yuba City"}
{"county_name":"Tehama","count_code":"52200","court_name":"Tehama Superior Court ","court_city":"Corning"}
{"county_name":"Tehama","count_code":"52660","court_name":"Red Bluff Courthouse","court_city":"Red Bluff"}
{"county_name":"Trinity","count_code":"53100","court_name":"Trinity County Superior Court","court_city":"Weaverville"}
{"county_name":"Tulare","count_code":"54100","court_name":"Tulare County Superior Court","court_city":"Visalia"}
{"county_name":"Tulare","count_code":"54465","court_name":"Porterville Division","court_city":"Porterville"}
{"county_name":"Tulare","count_code":"54485","court_name":"Tulare-Pixley Division","court_city":"Tulare"}
{"county_name":"Tulare","count_code":"54490","court_name":"County Civic Center, Room 124","court_city":"Visalia"}
{"county_name":"Tuolumne","count_code":"55100","court_name":"Tuolumne County Superior Court","court_city":"Sonora"}
{"county_name":"Ventura","count_code":"56100","court_name":"Ventura Division","court_city":"Ventura"}
{"county_name":"Ventura","count_code":"56200","court_name":"Juvenile Courthouse","court_city":"Ventura"}
{"county_name":"Yolo","count_code":"57420","court_name":"Yolo County Superior Court","court_city":"Woodland"}
{"county_name":"Yuba","count_code":"58100","court_name":"Yuba County Superior Court","court_city":"Marysville"}

{"county_name":"Riverside","count_code  ":"33100","court_name":"Robert Presley Hall of Justice","court_city":"Riverside"}
{"county_name":"Riverside","count_code  ":"33420","court_name":"Corona Court","court_city":"Corona"}
{"county_name":"Riverside","count_code  ":"33440","court_name":"Hemet Courthouse","court_city":"Hemet"}
{"county_name":"Riverside","count_code  ":"33442","court_name":"Banning Courthouse","court_city":"Banning"}
{"county_name":"Riverside","count_code  ":"33490","court_name":"Southwest Justice Center","court_city":"Murrieta"}
{"county_name":"Riverside","count_code  ":"33491","court_name":"Temecula Courthouse","court_city":"Temecula"}
{"county_name":"Riverside","count_code  ":"33480","court_name":"Blythe Courthouse","court_city":"Blythe"}