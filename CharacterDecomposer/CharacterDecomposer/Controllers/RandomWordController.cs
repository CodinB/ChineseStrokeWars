using CharacterDecomposer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CharacterDecomposer.Controllers
{
    [RoutePrefix("api/random")]
    [AllowAnonymous]
    public class RandomWordController : ApiController
    {
        readonly HSKScraperService hskScraperService;

        public RandomWordController()
        {
            this.hskScraperService = new HSKScraperService();
        }
        [HttpGet,Route()]
        public HttpResponseMessage GetRandomWord(string hskLevel)
        {
            return Request.CreateResponse(HttpStatusCode.OK, hskScraperService.GetRandomWord(hskLevel));
        }

    }
}
