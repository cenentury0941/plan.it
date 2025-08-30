"use client";
import React from "react";
import * as THREE from "three";
import { Text } from "troika-three-text";

export default function ARPage() {
  const startAR = async () => {
    if (!navigator.xr) {
      alert("WebXR not supported on this device/browser.");
      return;
    }

    // Parse URL params
    const params = new URLSearchParams(window.location.search);
    const targetLat = parseFloat(params.get("lat") || "0");
    const targetLon = parseFloat(params.get("lon") || "0");
    const placeText = params.get("text") || "Hello XR";
    const subTextParam = params.get("subtext") || "";

    try {
      const session = await navigator.xr.requestSession("immersive-ar", {
        requiredFeatures: ["local"],
        optionalFeatures: ["local-floor", "viewer"],
      });

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.xr.enabled = true;
      document.body.appendChild(renderer.domElement);

      // Scene + camera
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        10000
      );

      // --- Text elements ---
      const mainText = new Text();
      mainText.text = placeText;
      mainText.color = 0x000000; // black
      mainText.fontSize = 2;
      mainText.anchorX = "center";
      mainText.anchorY = "middle";
      mainText.maxWidth = 20;
      mainText.lineHeight = 1.1;
      mainText.letterSpacing = 0.02;

      const subText = new Text();
      subText.text = subTextParam;
      subText.color = 0x555555; // dark gray
      subText.fontSize = 1;
      subText.anchorX = "center";
      subText.anchorY = "top";
      subText.maxWidth = 20;
      subText.lineHeight = 1.1;
      subText.letterSpacing = 0.02;
      subText.position.set(0, -3, 0);

      // --- Group for sign ---
      const signGroup = new THREE.Group();
      signGroup.add(mainText);
      signGroup.add(subText);

      // --- Background plane ---
      const bgMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        depthWrite: false,
        depthTest: false, // keep behind text
      });
      const bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), bgMaterial);

      bgPlane.renderOrder = 0;
      mainText.renderOrder = 1;
      subText.renderOrder = 1;

      signGroup.add(bgPlane);

      // --- Background resizing (stable, local space) ---
      function updateBackground() {
        mainText.geometry.computeBoundingBox();
        subText.geometry.computeBoundingBox();

        if (!mainText.geometry.boundingBox || !subText.geometry.boundingBox) return;

        const mainBox = mainText.geometry.boundingBox.clone();
        const subBox = subText.geometry.boundingBox.clone();

        // shift subBox to match its local position
        subBox.min.y += subText.position.y;
        subBox.max.y += subText.position.y;

        // Merge bounding boxes
        const fullBox = mainBox.union(subBox);

        const size = new THREE.Vector3();
        fullBox.getSize(size);

        const center = new THREE.Vector3();
        fullBox.getCenter(center);

        const padding = 0.5;

        bgPlane.geometry.dispose();
        bgPlane.geometry = new THREE.PlaneGeometry(
          size.x + padding * 2,
          size.y + padding * 2
        );

        bgPlane.position.set(center.x, center.y, -0.05);
      }

      mainText.sync(updateBackground);
      subText.sync(updateBackground);

      // Billboard effect (always face camera)
      function makeBillboard(obj: THREE.Object3D) {
        return () => {
          obj.quaternion.copy(camera.quaternion);
        };
      }
      const updateBillboard = makeBillboard(signGroup);

      scene.add(signGroup);

      // --- GPS placement with bearing ---
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const deviceLat = pos.coords.latitude;
          const deviceLon = pos.coords.longitude;

          // Bearing calculation
          function bearing(lat1: number, lon1: number, lat2: number, lon2: number) {
            const dLon = (lon2 - lon1) * (Math.PI / 180);
            lat1 = lat1 * (Math.PI / 180);
            lat2 = lat2 * (Math.PI / 180);

            const y = Math.sin(dLon) * Math.cos(lat2);
            const x =
              Math.cos(lat1) * Math.sin(lat2) -
              Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
            return Math.atan2(y, x);
          }

          const angle = bearing(deviceLat, deviceLon, targetLat, targetLon);

          const dist = 50; // fixed distance
          const x = dist * Math.sin(angle);
          const z = dist * Math.cos(angle);

          signGroup.position.set(x, 0, -z);
        },
        (err) => console.error("Geolocation error:", err)
      );

      // Animate
      const animate = () => {
        updateBillboard();
        renderer.render(scene, camera);
      };
      renderer.setAnimationLoop(animate);
      renderer.xr.setSession(session);
    } catch (err) {
      console.error("Failed to start AR session:", err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={startAR}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg"
      >
        🚀 Start AR
      </button>
    </div>
  );
}
