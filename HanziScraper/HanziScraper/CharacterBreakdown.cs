using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HanziScraper
{
    public class CharacterBreakdown
    {
        public string Component { get; set; }
        public string Meaning { get; set; }
        public override string ToString()
        {
            return $"{Component} {Meaning} ";
        }

    }
}
