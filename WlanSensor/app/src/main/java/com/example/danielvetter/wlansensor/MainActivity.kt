package com.example.danielvetter.wlansensor

import android.Manifest
import android.content.Context
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.net.wifi.WifiManager
import android.net.wifi.WifiInfo
import android.content.Context.WIFI_SERVICE
import android.net.wifi.ScanResult
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import com.android.volley.Request
import com.android.volley.RequestQueue
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import java.util.*
import com.android.volley.toolbox.HttpHeaderParser
import com.android.volley.NetworkResponse
import com.android.volley.VolleyLog
import com.android.volley.AuthFailureError
import com.android.volley.VolleyError
import com.google.gson.Gson
import org.apache.http.HttpResponse
import org.apache.http.client.methods.HttpPost
import org.apache.http.entity.StringEntity
import org.apache.http.impl.client.DefaultHttpClient
import org.apache.http.util.EntityUtils
import java.io.UnsupportedEncodingException
import java.net.HttpURLConnection
import kotlin.collections.ArrayList
import kotlin.collections.HashMap


class MainActivity : AppCompatActivity() {
    private lateinit var _scanner: WLANScanner

    private lateinit var _btnStart: Button
    private lateinit var _btnEnd: Button
    private lateinit var _txtLocationPoint: EditText
    private lateinit var _txtLocationServiceUrl: EditText
    private lateinit var _textView: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        _scanner = WLANScanner(this)
        initializeComponents()


        _btnStart.setOnClickListener {
            _scanner.start();
            _btnStart.isEnabled = false;
            _btnEnd.isEnabled = true
            _txtLocationPoint.isEnabled = false;
            _txtLocationServiceUrl.isEnabled = false;

        }
        _btnEnd.setOnClickListener {
            _scanner.stop();
            this._btnStart.isEnabled = true;
            this._btnEnd.isEnabled = false
            _txtLocationPoint.isEnabled = true;
            _txtLocationServiceUrl.isEnabled = true;
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        _scanner.stop()
    }

    fun initializeComponents() {
        _textView = findViewById(R.id.wifiText) as TextView
        _btnStart = findViewById(R.id.wifiStartMeasuring) as Button
        _btnEnd = findViewById(R.id.wifiStopMeasuring) as Button
        _txtLocationPoint = findViewById(R.id.wifiLocationIdentifier) as EditText
        _txtLocationServiceUrl = findViewById(R.id.wifiLocationServiceUrl) as EditText
    }

    fun showResults(_lastScan: Date, currentDate: Date, results: List<ScanResult>) {
        var result = "";
        for (entry in results) {
            result += "${entry.BSSID} ${entry.SSID}: ${entry.level}\r\n"
        }
        _textView.setText(result)

        val entries = results.toTypedArray().map { WlanEntry(it.SSID, it.BSSID, it.level) }
        val p = WlanPackage(_txtLocationPoint.text.toString()                                                                                                         , entries.toTypedArray())

        val json = Gson().toJson(p)
        Thread({
            try {
                Log.i("WIFISENNSOR", "SENDING " + json)
                val httpClient = DefaultHttpClient();
                val httpPost = HttpPost(_txtLocationServiceUrl.text.toString());
                httpPost.setEntity(StringEntity(json, "UTF-8"));
                httpPost.setHeader("Content-Type", "application/json");
                httpPost.setHeader("Accept-Encoding", "application/json");
                httpPost.setHeader("Accept-Language", "en-US");
                val response = httpClient.execute(httpPost);
                val sresponse = response.getEntity().toString();
                Log.w("QueingSystem", sresponse);
                Log.w("QueingSystem", EntityUtils.toString(response.getEntity()));
                Log.i("WLANSCANNER", "Http Send")
            } catch (e: Exception) {
                runOnUiThread({
                    Toast.makeText(this, e.message, Toast.LENGTH_SHORT).show()
                })
            }
        }).start()

    }
}

class WlanPackage(val navPointName: String, val entries: Array<WlanEntry>) {

}

data class WlanEntry(val name: String, val bssid: String, val level: Int) {}
