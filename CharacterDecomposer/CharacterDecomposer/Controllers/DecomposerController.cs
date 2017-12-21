using CharacterDecomposer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CharacterDecomposer.Controllers
{
    [RoutePrefix("api/decomposer")]
    [AllowAnonymous]
    public class DecomposerController : ApiController
    {
        readonly DecompService decompService;

        public DecomposerController()
        {
            this.decompService = new DecompService();
        }

        [HttpGet,Route("{character}")]
        public HttpResponseMessage GetCharacterBreakdown(string character)
        {
            return Request.CreateResponse(HttpStatusCode.OK, decompService.GetCharacterBreakdown(character));
        }
            
    }
}
