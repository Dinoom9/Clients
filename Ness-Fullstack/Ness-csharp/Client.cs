using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MyServer
{
    public class Client
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)] // This tells the driver to handle this as an ObjectId
        [BsonIgnoreIfDefault] // This will ignore the field if it's set to its default value (null)
        public string? _id { get; set; }

        public string? fullName { get; set; }
        public string? id { get; set; }
        public string? ipAddress { get; set; }
        public string? geoLocation { get; set; }
        public string? phoneNumber { get; set; }
       

       
    }
}