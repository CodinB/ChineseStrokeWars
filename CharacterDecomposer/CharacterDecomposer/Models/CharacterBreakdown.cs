using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CharacterDecomposer
{
    public class CharacterBreakdown
    {
        public string Component { get; set; }
        public string Meaning { get; set; }
        public string WholeCharacter { get; set; }
        public override string ToString()
        {
            return $"{WholeCharacter} {Component} {Meaning} ";
        }

    }
}
