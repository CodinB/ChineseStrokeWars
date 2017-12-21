using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace CharacterDecomposer.Models
{
    public class HSKScraperService
    {
        public HSKWords GetRandomWord(string hskLevel)
        {
            using (SqlConnection con = new SqlConnection("data source =.;database=HSKWords; integrated security=SSPI"))
            {
                con.Open();

                SqlCommand cmd = con.CreateCommand();
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.CommandText = "Words_Get_Random";
                cmd.Parameters.AddWithValue("@hskLevel", hskLevel);

                using (SqlDataReader dr = cmd.ExecuteReader())
                {
                    if (dr.Read())
                    {
                        HSKWords word = new HSKWords();
                        word.Word = dr.GetString(0);
                        return word;
                    }
                    else
                    {
                        throw new Exception("should never get here");
                    }
                }
            }
        }
    }
}