namespace WebApi.Models
{
    public class JWTModel
    {
        public string Key { get; set; }
        public string Audience { get; set; }
        public string Issuer { get; set; }
    }
}