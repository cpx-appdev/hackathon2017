package com.example.danielvetter.wlansensor

import android.Manifest
import android.app.Activity
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.net.wifi.WifiManager
import java.util.*

/**
 * Created by Daniel.Vetter on 16.09.2017.
 */
class WLANScanner(private val _owner: MainActivity) : BroadcastReceiver() {
    private val _wifiManager: WifiManager;
    private var _lastScan: Date? = null
    private var _isStarted: Boolean = false

    init {
        _owner.requestPermissions(arrayOf<String>(Manifest.permission.ACCESS_COARSE_LOCATION), 0)
        _wifiManager = _owner.getSystemService(Context.WIFI_SERVICE) as WifiManager
        _owner.registerReceiver(this, IntentFilter(WifiManager.SCAN_RESULTS_AVAILABLE_ACTION))
    }

    override fun onReceive(context: Context?, intent: Intent?) {
        val results = _wifiManager.scanResults
        val currentDate = Date()
        _lastScan = currentDate
        if (_isStarted) {
            _owner.showResults(_lastScan!!, currentDate, results);
            _wifiManager.startScan()
        }
    }

    fun start() {
        this._isStarted = true;
        _lastScan = Date()
        _owner.registerReceiver(this, IntentFilter(WifiManager.SCAN_RESULTS_AVAILABLE_ACTION))
        _wifiManager.startScan()
    }

    fun stop() {
        _isStarted = false;
        _owner.unregisterReceiver(this)
    }
}