using System.Text;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace MyServer.Controllers;

[ApiController]
[Route("[controller]")]
public class ClientsController : ControllerBase
{
        private readonly IMongoDatabase _database;
         private readonly IMongoCollection<BsonDocument> _collection;

                public ClientsController(IMongoClient mongoClient)
        {
            
            _database = mongoClient.GetDatabase("task");
            _collection =  _database.GetCollection<BsonDocument>("customers");
        }

    Client? DataClients;
    public async Task<List<Client>> getData(){

        var documents = _collection.Find(new BsonDocument()).ToList();

        var persons = new List<Client>();
        foreach (var dict in documents)
        {
            try{  //check if geolocation exist
                     string geoLocation;
        if (!dict.Contains("geoLocation"))
        {
            geoLocation = "No geo location available";
            dict["geoLocation"] = geoLocation; // Add the geoLocation field
        }
        else
        {
            geoLocation = dict["geoLocation"].ToString();
        }
                // Cretae a new Object Client
                var person = new Client
                {
                    _id = dict["_id"].ToString(),
                    fullName = dict["fullName"].ToString(),
                    id = dict["id"].ToString(),
                    ipAddress = dict["ipAddress"].ToString(),
                    geoLocation = geoLocation,
                    phoneNumber = dict["phoneNumber"].ToString()   
                
                 };
                persons.Add(person);
            }
            catch (Exception ex)
                 {
                Console.WriteLine($"An error occurred: {ex.Message}");
               }
           
        }
        
        return persons;
    }

    [HttpGet("getClients")] //Get All Data of Clients
    public async Task<IEnumerable<Client>> GetAll()
    {
        List<Client> clients = await getData();
        return clients;
    }

    [HttpPost("addClient")]  //Add a new Client
    public async Task<ActionResult> Post(Client client)
    {
        if (client == null)
        {
            return BadRequest("Invalid data");
        }
        try{
            //When new user is added it sends his IP address to outer api to get its geo location.
            HttpClient loc = new HttpClient();
        string location = await loc.GetStringAsync("http://ip-api.com/json/" + client.ipAddress + "?fields=country,city");
        JObject apiResponse = JObject.Parse(location);
            if (apiResponse["country"] == null || apiResponse["city"] == null)
            {
                client.geoLocation = "No geo location available";
            }
            else
            {
             client.geoLocation = apiResponse["country"].ToString() + ", " + apiResponse["city"].ToString();
            }      

        // Insert into collection
        _collection.InsertOne(client.ToBsonDocument());

        return Ok("Data received successfully");
        }catch(Exception ex){
                Console.WriteLine($"An error occurred: {ex.Message}");
    Console.WriteLine(ex.StackTrace);
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("deleteClient")] //Delete Client by id
    public IActionResult Post([FromBody] string[] ids)
    {   
        Console.WriteLine(ids[0]);
        if (ids == null)
        {
            return BadRequest("Invalid data");
        }
        var filter = Builders<BsonDocument>.Filter.In("id", ids); 

        var result = _collection.DeleteMany(filter);

        Console.WriteLine($"Deleted {result.DeletedCount} documents."); 

        return Ok("Data received successfully");
    }

}

